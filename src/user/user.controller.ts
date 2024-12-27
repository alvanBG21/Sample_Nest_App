import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  //   post put  get delete
  @Post('')
  async createUser(@Body() userDto: UserDto) {
    return await this.userService.createUser(userDto);
  }

  @Get('')
  async getAllUsers() {
    return await this.userService.getAllUsers();
  }
  @Get('/:user_id')
  async getUserById(
    @Param('user_id') user_id: string,
    @Query('user') user: number,
  ) {
    console.log(user);
    return await this.userService.getUserById(user_id);
  }
}
