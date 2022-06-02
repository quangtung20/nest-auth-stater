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
exports.CommentService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const mongoose_3 = require("mongoose");
const comment_schema_1 = require("../../database/schemas/comment.schema");
let CommentService = class CommentService {
    constructor(commentModel) {
        this.commentModel = commentModel;
        this.pagination = (page, limit) => {
            let newPage = Number(page) * 1 || 1;
            let newLimit = Number(limit) * 1 || 4;
            let skip = (newPage - 1) * newLimit;
            return { page: newPage, limit: newLimit, skip };
        };
    }
    async createComment(newCommentDto, user) {
        try {
            const { content, blog_id, blog_user_id } = newCommentDto;
            const newComment = await this.commentModel.create({
                user: user._id,
                content,
                blog_id: new mongoose_3.default.Types.ObjectId(blog_id),
                blog_user_id: new mongoose_3.default.Types.ObjectId(blog_user_id)
            });
            return newComment;
        }
        catch (error) {
            throw new common_1.BadRequestException({ msg: error.message });
        }
    }
    async getComments(newPage, newLimit, id) {
        const { limit, skip } = this.pagination(newPage, newLimit);
        try {
            const data = await this.commentModel.aggregate([
                {
                    $facet: {
                        totalData: [
                            {
                                $match: {
                                    blog_id: new mongoose_3.default.Types.ObjectId(id),
                                    comment_root: { $exists: false },
                                    reply_user: { $exists: false }
                                }
                            },
                            {
                                $lookup: {
                                    "from": "users",
                                    "let": { user_id: "$user" },
                                    "pipeline": [
                                        { $match: { $expr: { $eq: ["$_id", "$$user_id"] } } },
                                        { $project: { name: 1, avatar: 1 } }
                                    ],
                                    "as": "user"
                                }
                            },
                            { $unwind: "$user" },
                            {
                                $lookup: {
                                    "from": "comments",
                                    "let": { cm_id: "$replyCM" },
                                    "pipeline": [
                                        { $match: { $expr: { $in: ["$_id", "$$cm_id"] } } },
                                        {
                                            $lookup: {
                                                "from": "users",
                                                "let": { user_id: "$user" },
                                                "pipeline": [
                                                    { $match: { $expr: { $eq: ["$_id", "$$user_id"] } } },
                                                    { $project: { name: 1, avatar: 1 } }
                                                ],
                                                "as": "user"
                                            }
                                        },
                                        { $unwind: "$user" },
                                        {
                                            $lookup: {
                                                "from": "users",
                                                "let": { user_id: "$reply_user" },
                                                "pipeline": [
                                                    { $match: { $expr: { $eq: ["$_id", "$$user_id"] } } },
                                                    { $project: { name: 1, avatar: 1 } }
                                                ],
                                                "as": "reply_user"
                                            }
                                        },
                                        { $unwind: "$reply_user" }
                                    ],
                                    "as": "replyCM"
                                }
                            },
                            { $sort: { createdAt: -1 } },
                            { $skip: skip },
                            { $limit: limit }
                        ],
                        totalCount: [
                            {
                                $match: {
                                    blog_id: new mongoose_3.default.Types.ObjectId(id),
                                    comment_root: { $exists: false },
                                    reply_user: { $exists: false }
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
            const comments = data[0].totalData;
            const count = data[0].count;
            let total = 0;
            if (count % limit === 0) {
                total = count / limit;
            }
            else {
                total = Math.floor(count / limit) + 1;
            }
            return { comments, total };
        }
        catch (error) {
            throw new common_1.BadRequestException({ msg: error.message });
        }
    }
    async replyComment(user, replyCommentDto) {
        try {
            const { content, blog_id, blog_user_id, comment_root, reply_user } = replyCommentDto;
            const newComment = await this.commentModel.create({
                user: user._id,
                content,
                blog_id: new mongoose_3.default.Types.ObjectId(blog_id),
                blog_user_id: new mongoose_3.default.Types.ObjectId(blog_user_id),
                comment_root: new mongoose_3.default.Types.ObjectId(comment_root),
                reply_user: new mongoose_3.default.Types.ObjectId(reply_user._id),
            });
            await this.commentModel.findOneAndUpdate({ _id: comment_root }, {
                $push: { replyCM: newComment._id }
            });
            await newComment.save();
            return newComment;
        }
        catch (error) {
            throw new common_1.BadRequestException({ msg: error.message });
        }
    }
    async updateComment(user, id, content) {
        try {
            const comment = await this.commentModel.findOneAndUpdate({
                _id: id,
                user: user._id
            }, {
                content
            });
            if (!comment) {
                throw new common_1.BadRequestException({ msg: 'comment does not exist' });
            }
            return { msg: "Update Success!" };
        }
        catch (error) {
            throw new common_1.BadRequestException({ msg: error.message });
        }
    }
    async deleteComment(user, id) {
        try {
            const comment = await this.commentModel.findOneAndDelete({
                _id: id,
                $or: [
                    { user: user._id },
                    { blog_user_id: user._id }
                ]
            });
            if (!comment) {
                throw new common_1.BadRequestException({ msg: 'comment does not exist' });
            }
            if (comment.comment_root) {
                await this.commentModel.findByIdAndUpdate({
                    _id: comment.comment_root
                }, {
                    $pull: { replyCM: comment._id }
                });
            }
            else {
                await this.commentModel.deleteMany({ _id: { $in: comment.replyCM } });
            }
            return { msg: "Delete Success!" };
        }
        catch (error) {
            throw new common_1.BadRequestException({ msg: error.message });
        }
    }
};
CommentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(comment_schema_1.Comment.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], CommentService);
exports.CommentService = CommentService;
//# sourceMappingURL=comment.service.js.map