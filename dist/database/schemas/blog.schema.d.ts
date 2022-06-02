import mongoose from "mongoose";
import { Document } from 'mongoose';
import { Category } from "./category.schema";
import { User } from "./user.schema";
export declare type BlogDocument = Blog & Document;
export declare class Blog {
    user: User;
    title: string;
    content: string;
    description: string;
    thumbnail: string;
    category: Category;
}
export declare const BlogSchema: mongoose.Schema<mongoose.Document<Blog, any, any>, mongoose.Model<mongoose.Document<Blog, any, any>, any, any, any>, {}, {}>;
