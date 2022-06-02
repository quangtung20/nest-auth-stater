import mongoose from "mongoose";
import { Document } from 'mongoose';
export declare type UserDocument = User & Document & {
    _doc: object;
} & {
    _id: mongoose.Types.ObjectId;
};
export declare class User {
    fullname: string;
    username: string;
    email: string;
    password: string;
    avatar: string;
    role: string;
    gender: string;
    mobile: string;
    address: string;
    story: string;
    website: string;
    followers: User[];
    following: User[];
    saved: string;
}
export declare const UserSchema: mongoose.Schema<mongoose.Document<User, any, any>, mongoose.Model<mongoose.Document<User, any, any>, any, any, any>, {}, {}>;
