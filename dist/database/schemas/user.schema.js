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
var User_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = exports.User = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let User = User_1 = class User {
};
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        required: [true, 'please type fullname'],
    }),
    __metadata("design:type", String)
], User.prototype, "fullname", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        required: true,
        unique: true
    }),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        required: true,
        unique: true
    }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        required: true
    }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        default: 'https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png'
    }),
    __metadata("design:type", String)
], User.prototype, "avatar", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        default: 'user'
    }),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        default: 'male'
    }),
    __metadata("design:type", String)
], User.prototype, "gender", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String
    }),
    __metadata("design:type", String)
], User.prototype, "mobile", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String
    }),
    __metadata("design:type", String)
], User.prototype, "address", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String
    }),
    __metadata("design:type", String)
], User.prototype, "story", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String
    }),
    __metadata("design:type", String)
], User.prototype, "website", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: [{ type: mongoose_2.default.Types.ObjectId, ref: User_1.name }]
    }),
    __metadata("design:type", Array)
], User.prototype, "followers", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: [{ type: mongoose_2.default.Types.ObjectId, ref: User_1.name }]
    }),
    __metadata("design:type", Array)
], User.prototype, "following", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: [{ type: mongoose_2.default.Types.ObjectId, ref: User_1.name }]
    }),
    __metadata("design:type", String)
], User.prototype, "saved", void 0);
User = User_1 = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], User);
exports.User = User;
exports.UserSchema = mongoose_1.SchemaFactory.createForClass(User);
//# sourceMappingURL=user.schema.js.map