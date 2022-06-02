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
exports.CommentController = void 0;
const common_1 = require("@nestjs/common");
const get_user_decorator_1 = require("../../decorators/get-user.decorator");
const role_guard_1 = require("../../guards/role.guard");
const comment_service_1 = require("./comment.service");
let CommentController = class CommentController {
    constructor(commentService) {
        this.commentService = commentService;
    }
    createComment(user, newCommentDto) {
        return this.commentService.createComment(newCommentDto, user);
    }
    getComment(id, page, limit) {
        return this.commentService.getComments(page, limit, id);
    }
    replyComment(user, replyCommentDto) {
        return this.commentService.replyComment(user, replyCommentDto);
    }
    updateComment(id, user, content) {
        return this.commentService.updateComment(user, id, content);
    }
    deleteComment(id, user) {
        return this.commentService.deleteComment(user, id);
    }
};
__decorate([
    (0, common_1.Post)('comment'),
    (0, common_1.UseGuards)((0, role_guard_1.default)('user')),
    __param(0, (0, get_user_decorator_1.GetUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], CommentController.prototype, "createComment", null);
__decorate([
    (0, common_1.Get)('comments/blog/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number]),
    __metadata("design:returntype", void 0)
], CommentController.prototype, "getComment", null);
__decorate([
    (0, common_1.Post)('reply_comment'),
    (0, common_1.UseGuards)((0, role_guard_1.default)('user')),
    __param(0, (0, get_user_decorator_1.GetUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], CommentController.prototype, "replyComment", null);
__decorate([
    (0, common_1.Patch)('comment/:id'),
    (0, common_1.UseGuards)((0, role_guard_1.default)('user')),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __param(2, (0, common_1.Body)('content')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, String]),
    __metadata("design:returntype", void 0)
], CommentController.prototype, "updateComment", null);
__decorate([
    (0, common_1.Delete)('comment/:id'),
    (0, common_1.UseGuards)((0, role_guard_1.default)('user')),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], CommentController.prototype, "deleteComment", null);
CommentController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [comment_service_1.CommentService])
], CommentController);
exports.CommentController = CommentController;
//# sourceMappingURL=comment.controller.js.map