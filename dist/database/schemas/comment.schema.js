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
var Comment_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentSchema = exports.Comment = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const class_transformer_1 = require("class-transformer");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("./user.schema");
let Comment = Comment_1 = class Comment {
};
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose_2.default.Types.ObjectId, ref: user_schema_1.User.name
    }),
    (0, class_transformer_1.Type)(() => user_schema_1.User),
    __metadata("design:type", user_schema_1.User)
], Comment.prototype, "user", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose_2.default.Types.ObjectId
    }),
    __metadata("design:type", mongoose_2.default.Types.ObjectId)
], Comment.prototype, "blog_id", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose_2.default.Types.ObjectId
    }),
    __metadata("design:type", mongoose_2.default.Types.ObjectId)
], Comment.prototype, "blog_user_id", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String, required: true
    }),
    __metadata("design:type", String)
], Comment.prototype, "content", void 0);
__decorate([
    (0, mongoose_1.Prop)([{
            type: mongoose_2.default.Types.ObjectId, ref: Comment_1.name
        }]),
    __metadata("design:type", Array)
], Comment.prototype, "replyCM", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose_2.default.Types.ObjectId, ref: user_schema_1.User.name
    }),
    __metadata("design:type", mongoose_2.default.Types.ObjectId)
], Comment.prototype, "reply_user", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose_2.default.Types.ObjectId, ref: Comment_1.name
    }),
    __metadata("design:type", mongoose_2.default.Types.ObjectId)
], Comment.prototype, "comment_root", void 0);
Comment = Comment_1 = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Comment);
exports.Comment = Comment;
exports.CommentSchema = mongoose_1.SchemaFactory.createForClass(Comment);
//# sourceMappingURL=comment.schema.js.map