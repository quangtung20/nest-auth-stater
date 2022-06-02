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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("../../database/schemas/user.schema");
let UserService = class UserService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async getUser(_id) {
        try {
            const user = await this.userModel.findById(_id)
                .populate("followers following", "-password");
            return { user: Object.assign(Object.assign({}, user._doc), { _id }) };
        }
        catch (error) {
            throw new common_1.InternalServerErrorException({ msg: error.message });
        }
    }
    async updateUser(user, body) {
        try {
            await this.userModel.findByIdAndUpdate(user._id, body);
            return { msg: 'update user success' };
        }
        catch (error) {
            throw new common_1.InternalServerErrorException({ msg: error.message });
        }
    }
    async follow(follower, following) {
        const checkFollow = await this.userModel.findOne({ _id: follower, followers: following });
        if (checkFollow) {
            throw new common_1.BadRequestException({ msg: 'you are followed this user' });
        }
        try {
            const updateFollower = await this.userModel.findByIdAndUpdate(follower, {
                $push: { followers: following }
            }, { new: true }).populate("followers following", "-password");
            await this.userModel.findByIdAndUpdate(following, {
                $push: { following: follower }
            }, { new: true });
            return { newUser: updateFollower };
        }
        catch (error) {
            throw new common_1.InternalServerErrorException({ msg: error.message });
        }
    }
    async unFollow(unFollower, unFollowing) {
        try {
            const updateUnFollower = await this.userModel.findByIdAndUpdate(unFollower, {
                $pull: { followers: unFollowing },
            }, { new: true }).populate('followers following', '-password');
            await this.userModel.findByIdAndUpdate(unFollowing, {
                $pull: { following: unFollower },
            }, { new: true });
            return { newUser: updateUnFollower };
        }
        catch (error) {
            throw new common_1.InternalServerErrorException({ msg: error.message });
        }
    }
    async suggestionUser(user, num) {
        const withoutUser = [...user.following, user._id];
        const paginationNum = num || 10;
        let users = await this.userModel.find({
            _id: { $nin: withoutUser }
        }).skip(paginationNum).populate('followers following', '-password');
        const newUsers = users.map(user => (Object.assign(Object.assign({}, user._doc), { _id: user._id.toString() })));
        return {
            users: newUsers,
            result: users.length
        };
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map