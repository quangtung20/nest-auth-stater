import { Model } from "mongoose";
import { User, UserDocument } from 'src/database/schemas/user.schema';
export declare class UserService {
    private userModel;
    constructor(userModel: Model<UserDocument>);
    getUser(_id: any): Promise<{
        user: {
            _id: any;
        };
    }>;
    updateUser(user: UserDocument, body: any): Promise<{
        msg: string;
    }>;
    follow(follower: string, following: string): Promise<{
        newUser: User & import("mongoose").Document<any, any, any> & {
            _doc: object;
        } & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            _id: any;
        };
    }>;
    unFollow(unFollower: any, unFollowing: any): Promise<{
        newUser: User & import("mongoose").Document<any, any, any> & {
            _doc: object;
        } & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            _id: any;
        };
    }>;
    suggestionUser(user: UserDocument, num?: number): Promise<{
        users: {
            _id: any;
        }[];
        result: number;
    }>;
}
