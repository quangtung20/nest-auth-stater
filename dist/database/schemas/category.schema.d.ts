/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose" />
export declare type CategoryDocument = Category & Document;
export declare class Category {
    name: string;
}
export declare const CategorySchema: import("mongoose").Schema<import("mongoose").Document<Category, any, any>, import("mongoose").Model<import("mongoose").Document<Category, any, any>, any, any, any>, {}, {}>;
