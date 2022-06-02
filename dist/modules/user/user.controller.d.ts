import { UserDocument } from 'src/database/schemas/user.schema';
import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getUserById(id: string): Promise<{
        user: {
            _id: any;
        };
    }>;
    updateUser(user: UserDocument, body: any): Promise<{
        msg: string;
    }>;
    getSuggestionUser(user: UserDocument, num: number): Promise<{
        users: {
            _id: any;
        }[];
        result: number;
    }>;
}
