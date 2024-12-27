import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schema/user.schema';
import { Model } from 'mongoose';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createUser(userDto: UserDto): Promise<User> {
    const existing = await this.userModel.findOne({
      email: userDto.email,
    });

    if (existing) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'user already exists',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    try {
      const user = new this.userModel({
        first_name: userDto.first_name,
        last_name: userDto.last_name,
        email: userDto.email,
        age: userDto.age,
      });
      await user.save();
      console.log(user);

      return user;
    } catch (err) {
      console.log(err);
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'error creating user',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getAllUsers() {
    const users = await this.userModel.find({});
    return users;
  }
  async getUserById(user_id: string) {
    const user = await this.userModel.findById(user_id);
    return user;
  }
}
