import { Body, ClassSerializerInterceptor, Controller, Get, Param, Patch, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserDocument } from 'src/database/schemas/user.schema';
import { GetUser } from 'src/decorators/get-user.decorator';
import RoleGuard from 'src/guards/role.guard';
import { UserService } from './user.service';




@Controller('')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) { }
  
  @Get('user/:id')
  @UseGuards(RoleGuard('user')) 
  getUserById(
    @Param('id') id:string
  ){
    return this.userService.getUser(id);
  }

  @Patch('user')
  @UseGuards(RoleGuard('user'))
  updateUser(
    @GetUser() user:UserDocument,
    @Body() body,
  ){
    return this.userService.updateUser(user,body);
  }


  @Get('suggestionsUser')
  @UseGuards(RoleGuard('user'))
  getSuggestionUser(
    @GetUser() user:UserDocument,
    @Query() num:number
  ){
    return this.userService.suggestionUser(user,num);
  }
  
  
}
