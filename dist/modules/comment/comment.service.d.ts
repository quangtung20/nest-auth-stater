import { Model } from "mongoose";
import mongoose from 'mongoose';
import { Comment, CommentDocument } from 'src/database/schemas/comment.schema';
import { INewComment, IUser } from 'src/config/interface';
export declare class CommentService {
    private commentModel;
    constructor(commentModel: Model<CommentDocument>);
    pagination: (page: any, limit: any) => {
        page: number;
        limit: number;
        skip: number;
    };
    createComment(newCommentDto: INewComment, user: IUser): Promise<mongoose.Document<unknown, any, CommentDocument> & Comment & Document & {
        _id: mongoose.Types.ObjectId;
    }>;
    getComments(newPage: number, newLimit: number, id: string): Promise<{
        comments: any;
        total: number;
    }>;
    replyComment(user: IUser, replyCommentDto: INewComment): Promise<mongoose.Document<unknown, any, CommentDocument> & Comment & Document & {
        _id: mongoose.Types.ObjectId;
    }>;
    updateComment(user: IUser, id: string, content: string): Promise<{
        msg: string;
    }>;
    deleteComment(user: IUser, id: string): Promise<{
        msg: string;
    }>;
}
