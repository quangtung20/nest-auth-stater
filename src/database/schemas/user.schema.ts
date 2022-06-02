import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Document } from 'mongoose';

export type UserDocument = User & Document & {_doc:object} & {
    _id: mongoose.Types.ObjectId;
};

@Schema({ timestamps: true })
export class User {
    @Prop({
        type:String,
        required:[true,'please type fullname'],
    })
    fullname:string;

    @Prop({
        type:String,
        required:true,
        unique:true
    })
    username:string;

    @Prop({
        type:String,
        required:true,
        unique:true
    })
    email:string;

    @Prop({
        type:String,
        required:true
    })
    password:string;

    @Prop({
        type:String,
        default: 'https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png'
    })
    avatar:string;

    @Prop({
        type:String,
        default:'user'
    })
    role:string;

    @Prop({
        type:String,
        default:'male'
    })
    gender:string;

    @Prop({
        type:String
    })
    mobile:string;

    @Prop({
        type:String
    })
    address:string;

    @Prop({
        type:String
    })
    story:string;

    @Prop({
        type:String
    })
    website:string;

    @Prop({
        type:[{type:mongoose.Types.ObjectId, ref:User.name}]
    })
    followers:User[];

    @Prop({
        type:[{type:mongoose.Types.ObjectId, ref:User.name}]
    })
    following:User[];

    @Prop({
        type:[{type:mongoose.Types.ObjectId, ref:User.name}]
    })
    saved:string;
}

export const UserSchema = SchemaFactory.createForClass(User);