import mongoose from "mongoose";
import { User } from "./user.schema";
export declare type CommentDocument = Comment & Document;
export declare class Comment {
    user: User;
    blog_id: mongoose.Types.ObjectId;
    blog_user_id: mongoose.Types.ObjectId;
    content: string;
    replyCM: [mongoose.Types.ObjectId];
    reply_user: mongoose.Types.ObjectId;
    comment_root: mongoose.Types.ObjectId;
}
export declare const CommentSchema: mongoose.Schema<mongoose.Document<Comment, any, any>, mongoose.Model<mongoose.Document<Comment, any, any>, any, any, any>, {}, {}>;
