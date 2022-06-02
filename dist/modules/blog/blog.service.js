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
exports.BlogService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const mongoose_3 = require("mongoose");
const blog_schema_1 = require("../../database/schemas/blog.schema");
const comment_schema_1 = require("../../database/schemas/comment.schema");
let BlogService = class BlogService {
    constructor(blogModel, commentModel) {
        this.blogModel = blogModel;
        this.commentModel = commentModel;
        this.pagination = (page, limit) => {
            let newPage = Number(page) * 1 || 1;
            let newLimit = Number(limit) * 1 || 3;
            let skip = (newPage - 1) * newLimit;
            return { page: newPage, limit: newLimit, skip };
        };
    }
    async createBlog(user, newBlogDto) {
        try {
            const { title, content, description, thumbnail, category } = newBlogDto;
            const newBlog = await this.blogModel.create({
                user: user._id,
                title: title.toLowerCase(),
                content,
                description,
                thumbnail,
                category: new mongoose_2.default.Types.ObjectId(category)
            });
            return { newBlog };
        }
        catch (error) {
            throw new common_1.BadRequestException({ msg: error.message });
        }
    }
    async getHomeBlogs() {
        try {
            const blogs = await this.blogModel.aggregate([
                {
                    $lookup: {
                        from: "users",
                        let: { user_id: "$user" },
                        pipeline: [
                            { $match: { $expr: { $eq: ["$_id", "$$user_id"] } } },
                            { $project: { password: 0 } }
                        ],
                        as: "user"
                    }
                },
                { $unwind: "$user" },
                {
                    $lookup: {
                        "from": "categories",
                        "localField": "category",
                        "foreignField": "_id",
                        "as": "category"
                    }
                },
                { $unwind: "$category" },
                { $sort: { "createdAt": -1 } },
                {
                    $group: {
                        _id: "$category._id",
                        name: { $first: "$category.name" },
                        blogs: { $push: "$$ROOT" },
                        count: { $sum: 1 }
                    }
                },
                {
                    $project: {
                        blogs: {
                            $slice: ['$blogs', 0, 3]
                        },
                        count: 1,
                        name: 1
                    }
                }
            ]);
            return blogs;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException({ msg: error.message });
        }
    }
    async getBlogsByCategory(newPage, newLimit, id) {
        const { limit, skip } = this.pagination(newPage, newLimit);
        try {
            const Data = await this.blogModel.aggregate([
                {
                    $facet: {
                        totalData: [
                            {
                                $match: {
                                    category: new mongoose_2.default.Types.ObjectId(id)
                                }
                            },
                            {
                                $lookup: {
                                    from: "users",
                                    let: { user_id: "$user" },
                                    pipeline: [
                                        { $match: { $expr: { $eq: ["$_id", "$$user_id"] } } },
                                        { $project: { password: 0 } }
                                    ],
                                    as: "user"
                                }
                            },
                            { $unwind: "$user" },
                            { $sort: { createdAt: -1 } },
                            { $skip: skip },
                            { $limit: limit }
                        ],
                        totalCount: [
                            {
                                $match: {
                                    category: new mongoose_2.default.Types.ObjectId(id)
                                }
                            },
                            { $count: 'count' }
                        ]
                    }
                },
                {
                    $project: {
                        count: { $arrayElemAt: ["$totalCount.count", 0] },
                        totalData: 1
                    }
                }
            ]);
            const blogs = Data[0].totalData;
            const count = Data[0].count;
            let total = 0;
            if (count % limit === 0) {
                total = count / limit;
            }
            else {
                total = Math.floor(count / limit) + 1;
            }
            return { blogs, total };
        }
        catch (error) {
            throw new common_1.InternalServerErrorException({ msg: error.message });
        }
    }
    async getBlogByUser(newPage, newLimit, id) {
        const { limit, skip } = this.pagination(newPage, newLimit);
        try {
            const Data = await this.blogModel.aggregate([
                {
                    $facet: {
                        totalData: [
                            {
                                $match: {
                                    user: new mongoose_2.default.Types.ObjectId(id)
                                }
                            },
                            {
                                $lookup: {
                                    from: "users",
                                    let: { user_id: "$user" },
                                    pipeline: [
                                        { $match: { $expr: { $eq: ["$_id", "$$user_id"] } } },
                                        { $project: { password: 0 } }
                                    ],
                                    as: "user"
                                }
                            },
                            { $unwind: "$user" },
                            { $sort: { createdAt: -1 } },
                            { $skip: skip },
                            { $limit: limit }
                        ],
                        totalCount: [
                            {
                                $match: {
                                    user: new mongoose_2.default.Types.ObjectId(id)
                                }
                            },
                            { $count: 'count' }
                        ]
                    }
                },
                {
                    $project: {
                        count: { $arrayElemAt: ["$totalCount.count", 0] },
                        totalData: 1
                    }
                }
            ]);
            const blogs = Data[0].totalData;
            const count = Data[0].count;
            let total = 0;
            if (count % limit === 0) {
                total = count / limit;
            }
            else {
                total = Math.floor(count / limit) + 1;
            }
            return { blogs, total };
        }
        catch (error) {
            throw new common_1.InternalServerErrorException({ msg: error.message });
        }
    }
    async getBlog(id) {
        try {
            const blog = await this.blogModel.findById(id)
                .populate("user", "-password");
            if (!blog) {
                throw new common_1.BadRequestException({ msg: "Blog does not exist." });
            }
            return blog;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException({ msg: error.message });
        }
    }
    async updateBlog(user, updateBlogDto, id) {
        try {
            const blog = await this.blogModel.findOneAndUpdate({
                _id: id, user: user._id
            }, {
                title: updateBlogDto.title,
                content: updateBlogDto.content,
                description: updateBlogDto.description,
                thumbnail: updateBlogDto.thumbnail,
                category: new mongoose_2.default.Types.ObjectId(updateBlogDto.category)
            });
            if (!blog) {
                throw new common_1.BadRequestException({ msg: 'Invalid Authentication.' });
            }
            return { msg: 'Update Success!', blog };
        }
        catch (error) {
            throw new common_1.InternalServerErrorException({ msg: error.message });
        }
    }
    async deleteBlog(user, id) {
        try {
            const check = await this.blogModel.findOne({
                user: user._id
            });
            let blog;
            if (check || user.role === 'admin') {
                blog = await this.blogModel.findOneAndDelete({
                    _id: id,
                });
            }
            if (!blog) {
                throw new common_1.BadRequestException({ msg: 'Invalid Authentication.' });
            }
            await this.commentModel.deleteMany({
                blog_id: blog._id
            });
            return { msg: 'Delete Success!' };
        }
        catch (error) {
            throw new common_1.InternalServerErrorException({ msg: error.message });
        }
    }
    async searchBlogs(title) {
        try {
            const blogs = await this.blogModel.find({ name: { $regex: '.*' + title + '.*' } })
                .populate('user');
            if (!blogs.length) {
                throw new common_1.BadRequestException({ msg: 'No blogs' });
            }
            return blogs;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error.message);
        }
    }
};
BlogService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(blog_schema_1.Blog.name)),
    __param(1, (0, mongoose_1.InjectModel)(comment_schema_1.Comment.name)),
    __metadata("design:paramtypes", [mongoose_3.Model,
        mongoose_3.Model])
], BlogService);
exports.BlogService = BlogService;
//# sourceMappingURL=blog.service.js.map