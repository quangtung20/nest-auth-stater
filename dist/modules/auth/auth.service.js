"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const mongoose_1 = require("@nestjs/mongoose");
const user_schema_1 = require("../../database/schemas/user.schema");
const mongoose_2 = require("mongoose");
const bcrypt = require("bcryptjs");
let AuthService = class AuthService {
    constructor(jwtService, configService, userModel) {
        this.jwtService = jwtService;
        this.configService = configService;
        this.userModel = userModel;
        this.hashSecret = this.configService.get('HASH_PASS');
        this.atSecret = this.configService.get('AT_SECRET');
        this.rtSecret = this.configService.get('RT_SECRET');
    }
    async genToken(payload, res) {
        const accessToken = await this.jwtService.sign(payload, {
            secret: this.atSecret,
            expiresIn: '1d'
        });
        const refreshToken = await this.jwtService.sign(payload, {
            secret: this.rtSecret,
            expiresIn: '30d'
        });
        res.cookie('refreshtoken', refreshToken, {
            httpOnly: true,
            path: '/api/refresh_token',
            maxAge: 30 * 24 * 60 * 60 * 1000
        });
        return accessToken;
    }
    async register(body, res) {
        const newFullname = body.fullname.toLowerCase();
        const checkUsername = await this.userModel.findOne({ username: body.username });
        if (checkUsername) {
            throw new common_1.BadRequestException({ msg: "This user name already exists." });
        }
        const checkEmail = await this.userModel.findOne({ email: body.email });
        if (checkEmail) {
            throw new common_1.BadRequestException({ msg: "This email already exists." });
        }
        const password = await bcrypt.hash(body.password, this.hashSecret);
        const accessToken = await this.genToken({ _id: body.id }, res);
        const newUser = await this.userModel.create(Object.assign(Object.assign({}, body), { password, fullname: newFullname }));
        return {
            msg: 'Register Success!',
            access_token: accessToken,
            user: Object.assign({}, newUser._doc)
        };
    }
    async login(email, password, res) {
        const checkUser = await this.userModel.findOne({ email });
        if (!checkUser) {
            throw new common_1.NotFoundException({ msg: "This email does not exist." });
        }
        const checkPass = await bcrypt.compare(password, checkUser.password);
        if (!checkPass) {
            throw new common_1.BadRequestException({ msg: 'Invalid credential' });
        }
        const accessToken = await this.genToken({ id: checkUser._id }, res);
        return {
            msg: 'Login Success!',
            access_token: accessToken,
            user: Object.assign(Object.assign({}, checkUser._doc), { password: '' })
        };
    }
    async logout(res) {
        res.clearCookie('refreshtoken', {
            path: '/api/refresh_token',
        });
        return { msg: 'logout success' };
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        config_1.ConfigService,
        mongoose_2.Model])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map