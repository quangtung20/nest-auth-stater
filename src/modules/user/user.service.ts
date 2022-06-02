import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from "mongoose";
import { User, UserDocument } from 'src/database/schemas/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>
  ) { }
    
  async getUser(_id){
    try {
      const user = await this.userModel.findById(_id)
      .populate("followers following", "-password");


    return {user:{...user._doc,_id}};
    } catch (error) {
      throw new InternalServerErrorException({msg:error.message})
    }
  }

  async updateUser(user:UserDocument,body){
    try {
      await this.userModel.findByIdAndUpdate(user._id,body);
      return {msg:'update user success'};
    } catch (error) {
      throw new InternalServerErrorException({msg:error.message})
    }
  }

  async follow(follower:string,following:string){
    const checkFollow = await this.userModel.findOne({_id:follower,followers:following});
    if(checkFollow){
      throw new BadRequestException({msg:'you are followed this user'});
    }

    try {
      const updateFollower = await this.userModel.findByIdAndUpdate(follower,{
        $push:{followers:following}
        },{new:true}
      ).populate("followers following", "-password");

      await this.userModel.findByIdAndUpdate(following,{
        $push:{following:follower}
      },{new:true});

      return {newUser:updateFollower};
    } catch (error) {
      throw new InternalServerErrorException({msg:error.message});
    }
  }

  async unFollow(unFollower,unFollowing){
    try {
      const updateUnFollower = await this.userModel.findByIdAndUpdate(unFollower,{
          $pull:{followers:unFollowing},
        },{new:true},
      ).populate('followers following','-password');
      
      await this.userModel.findByIdAndUpdate(unFollowing,{
        $pull:{following:unFollower},
      },{new:true});

      return {newUser:updateUnFollower};

    } catch (error) {
      throw new InternalServerErrorException({msg:error.message});
    }
  }

  async suggestionUser(user:UserDocument,num?:number){
    const withoutUser = [...user.following,user._id];

    const paginationNum = num || 10;

    let users = await this.userModel.find({
      _id:{$nin:withoutUser}
    }).skip(paginationNum).populate('followers following','-password');

    const newUsers = users.map(user=>({...user._doc,_id:user._id.toString()}));

    return {
      users:newUsers,
      result:users.length
    }
  }
  
  
}
