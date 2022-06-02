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
exports.BlogController = void 0;
const common_1 = require("@nestjs/common");
const get_user_decorator_1 = require("../../decorators/get-user.decorator");
const role_guard_1 = require("../../guards/role.guard");
const blog_service_1 = require("./blog.service");
let BlogController = class BlogController {
    constructor(blogService) {
        this.blogService = blogService;
    }
    createBlog(user, newBlogDto) {
        return this.blogService.createBlog(user, newBlogDto);
    }
    getHomeBlog() {
        return this.blogService.getHomeBlogs();
    }
    getBlogByCategory(id, page, limit) {
        return this.blogService.getBlogsByCategory(page, limit, id);
    }
    GetBlogByUser(id, page, limit) {
        return this.blogService.getBlogByUser(page, limit, id);
    }
    GetBlog(id) {
        return this.blogService.getBlog(id);
    }
    UpdateBlog(id, user, updateBlogDto) {
        return this.blogService.updateBlog(user, updateBlogDto, id);
    }
    deleteBlog(user, id) {
        return this.blogService.deleteBlog(user, id);
    }
    searchBlog(title) {
        return this.blogService.searchBlogs(title);
    }
};
__decorate([
    (0, common_1.Post)('blog'),
    (0, common_1.UseGuards)((0, role_guard_1.default)('user')),
    __param(0, (0, get_user_decorator_1.GetUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], BlogController.prototype, "createBlog", null);
__decorate([
    (0, common_1.Get)('home/blogs'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BlogController.prototype, "getHomeBlog", null);
__decorate([
    (0, common_1.Get)('blogs/category/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number]),
    __metadata("design:returntype", void 0)
], BlogController.prototype, "getBlogByCategory", null);
__decorate([
    (0, common_1.Get)('/blogs/user/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number]),
    __metadata("design:returntype", void 0)
], BlogController.prototype, "GetBlogByUser", null);
__decorate([
    (0, common_1.Get)('/blog/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BlogController.prototype, "GetBlog", null);
__decorate([
    (0, common_1.Put)('/blog/:id'),
    (0, common_1.UseGuards)((0, role_guard_1.default)('user')),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", void 0)
], BlogController.prototype, "UpdateBlog", null);
__decorate([
    (0, common_1.Delete)('/blog/:id'),
    (0, common_1.UseGuards)((0, role_guard_1.default)('user')),
    __param(0, (0, get_user_decorator_1.GetUser)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], BlogController.prototype, "deleteBlog", null);
__decorate([
    (0, common_1.Get)('/search/blogs'),
    __param(0, (0, common_1.Query)('title')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BlogController.prototype, "searchBlog", null);
BlogController = __decorate([
    (0, common_1.Controller)(''),
    __metadata("design:paramtypes", [blog_service_1.BlogService])
], BlogController);
exports.BlogController = BlogController;
//# sourceMappingURL=blog.controller.js.map