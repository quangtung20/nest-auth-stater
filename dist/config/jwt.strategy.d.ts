import { Strategy } from 'passport-jwt';
import { JwtPayload } from './jwt-payload.interface';
import { ConfigService } from '@nestjs/config';
import { User, UserDocument } from 'src/database/schemas/user.schema';
import { Model } from "mongoose";
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private configService;
    private userModel;
    constructor(configService: ConfigService, userModel: Model<UserDocument>);
    validate(payload: JwtPayload): Promise<User & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
}
export {};
