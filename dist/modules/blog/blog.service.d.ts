import mongoose from 'mongoose';
import { Model } from "mongoose";
import { INewBlog, IUser } from 'src/config/interface';
import { Blog, BlogDocument } from 'src/database/schemas/blog.schema';
import { CommentDocument } from 'src/database/schemas/comment.schema';
export declare class BlogService {
    private blogModel;
    private commentModel;
    constructor(blogModel: Model<BlogDocument>, commentModel: Model<CommentDocument>);
    pagination: (page: number, limit: number) => {
        page: number;
        limit: number;
        skip: number;
    };
    createBlog(user: IUser, newBlogDto: INewBlog): Promise<{
        newBlog: Blog & mongoose.Document<any, any, any> & {
            _id: any;
        };
    }>;
    getHomeBlogs(): Promise<any[]>;
    getBlogsByCategory(newPage: number, newLimit: number, id: string): Promise<{
        blogs: any;
        total: number;
    }>;
    getBlogByUser(newPage: number, newLimit: number, id: string): Promise<{
        blogs: any;
        total: number;
    }>;
    getBlog(id: string): Promise<Blog & mongoose.Document<any, any, any> & {
        _id: any;
    }>;
    updateBlog(user: IUser, updateBlogDto: INewBlog, id: string): Promise<{
        msg: string;
        blog: Blog & mongoose.Document<any, any, any> & {
            _id: any;
        };
    }>;
    deleteBlog(user: IUser, id: string): Promise<{
        msg: string;
    }>;
    searchBlogs(title: string): Promise<Omit<Blog & mongoose.Document<any, any, any> & {
        _id: any;
    }, never>[]>;
}
