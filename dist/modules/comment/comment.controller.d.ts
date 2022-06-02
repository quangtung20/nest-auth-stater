/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose" />
import { INewComment, IUser } from 'src/config/interface';
import { CommentService } from './comment.service';
export declare class CommentController {
    private commentService;
    constructor(commentService: CommentService);
    createComment(user: IUser, newCommentDto: INewComment): Promise<import("mongoose").Document<unknown, any, import("../../database/schemas/comment.schema").CommentDocument> & import("../../database/schemas/comment.schema").Comment & Document & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    getComment(id: string, page: number, limit: number): Promise<{
        comments: any;
        total: number;
    }>;
    replyComment(user: IUser, replyCommentDto: INewComment): Promise<import("mongoose").Document<unknown, any, import("../../database/schemas/comment.schema").CommentDocument> & import("../../database/schemas/comment.schema").Comment & Document & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    updateComment(id: string, user: IUser, content: string): Promise<{
        msg: string;
    }>;
    deleteComment(id: string, user: IUser): Promise<{
        msg: string;
    }>;
}
