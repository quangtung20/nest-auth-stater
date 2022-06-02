import { INewBlog, IUser } from 'src/config/interface';
import { BlogService } from './blog.service';
export declare class BlogController {
    private blogService;
    constructor(blogService: BlogService);
    createBlog(user: IUser, newBlogDto: INewBlog): Promise<{
        newBlog: import("../../database/schemas/blog.schema").Blog & import("mongoose").Document<any, any, any> & {
            _id: any;
        };
    }>;
    getHomeBlog(): Promise<any[]>;
    getBlogByCategory(id: string, page: number, limit: number): Promise<{
        blogs: any;
        total: number;
    }>;
    GetBlogByUser(id: string, page: number, limit: number): Promise<{
        blogs: any;
        total: number;
    }>;
    GetBlog(id: string): Promise<import("../../database/schemas/blog.schema").Blog & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
    UpdateBlog(id: string, user: IUser, updateBlogDto: INewBlog): Promise<{
        msg: string;
        blog: import("../../database/schemas/blog.schema").Blog & import("mongoose").Document<any, any, any> & {
            _id: any;
        };
    }>;
    deleteBlog(user: IUser, id: string): Promise<{
        msg: string;
    }>;
    searchBlog(title: string): Promise<Omit<import("../../database/schemas/blog.schema").Blog & import("mongoose").Document<any, any, any> & {
        _id: any;
    }, never>[]>;
}
