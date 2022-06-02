import { IUser } from 'src/config/interface';
import { CategoryService } from './category.service';
export declare class CategoryController {
    private readonly categoryService;
    constructor(categoryService: CategoryService);
    getCategories(): Promise<{
        categories: (import("mongoose").Document<unknown, any, import("../../database/schemas/category.schema").CategoryDocument> & import("../../database/schemas/category.schema").Category & Document & {
            _id: import("mongoose").Types.ObjectId;
        })[];
    }>;
    createCategory(user: IUser, name: string): Promise<{
        newCategory: import("mongoose").Document<unknown, any, import("../../database/schemas/category.schema").CategoryDocument> & import("../../database/schemas/category.schema").Category & Document & {
            _id: import("mongoose").Types.ObjectId;
        };
    }>;
    updateCategory(id: string, name: string): Promise<{
        msg: string;
    }>;
    deleteCategory(id: string): Promise<void>;
}
