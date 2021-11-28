import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { USERS_MODEL_PROVIDER } from '../config/constants';
import { CreateUserDto, UpdateUserDto } from './dtos/users.dto';
import { UsersInterface } from './interfaces/users.interface';
import * as bcrypt from 'bcrypt';
import { UsersReturnInterface } from './interfaces/users.return.interface';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USERS_MODEL_PROVIDER)
    private readonly userModel: Model<UsersInterface>,
    @Inject(USERS_MODEL_PROVIDER)
    private readonly userModel2: Model<UsersReturnInterface>,
  ) {}

  //create user
  async addUser(userDto: CreateUserDto): Promise<UsersInterface> {
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(userDto.password, salt);
    userDto.password = hashedPassword;
    const user = await this.userModel.create(userDto);
    await user.save();
    return await this.userModel.findById(user._id, { password: 0, __v: 0 });
  }
  //get one user
  async getOne(id): Promise<UsersInterface> {
    return await this.userModel.findById(id, { password: 0, __v: 0 });
  }

  // get all users
  async getAllUsers(): Promise<UsersReturnInterface[]> {
    return this.userModel.find(
      {},
      { date_naissance: 0, password: 0, createdAt: 0, __v: 0 },
    );
  }

  //find user by email
  async findUserByEmail(email: string): Promise<UsersInterface> {
    return await this.userModel.findOne({
      email: email,
    });
  }

  //Update user
  async updateUsers(user_id, usersDto: UpdateUserDto): Promise<UsersInterface> {
    await this.userModel.findByIdAndUpdate(user_id, usersDto);
    return await this.userModel.findById(user_id, {
      email: 0,
      password: 0,
      __v: 0,
    });
  }
}
