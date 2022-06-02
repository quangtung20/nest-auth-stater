import { Model } from "mongoose";
import { IUser } from 'src/config/interface';
import { Category, CategoryDocument } from 'src/database/schemas/category.schema';
export declare class CategoryService {
    private categoryModel;
    constructor(categoryModel: Model<CategoryDocument>);
    createCategory(user: IUser, name: string): Promise<{
        newCategory: import("mongoose").Document<unknown, any, CategoryDocument> & Category & Document & {
            _id: import("mongoose").Types.ObjectId;
        };
    }>;
    getCategories(): Promise<{
        categories: (import("mongoose").Document<unknown, any, CategoryDocument> & Category & Document & {
            _id: import("mongoose").Types.ObjectId;
        })[];
    }>;
    updateCategory(id: string, name: string): Promise<{
        msg: string;
    }>;
    deleteCategory(id: string): Promise<void>;
}
