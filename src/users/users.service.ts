import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findByEmail(email: string) {
    return this.userModel.findOne({ email });
  }

  async create(email: string, password: string) {
    const hashed = await bcrypt.hash(password, 10);
    const createdUser = new this.userModel({ email, password: hashed });
    return createdUser.save();
  }
}
