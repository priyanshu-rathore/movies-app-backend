import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto) {
    const { email, password } = createUserDto;
    const existing = await this.usersService.findByEmail(email);
    if (existing) throw new UnauthorizedException('Email already exists');
    const user = await this.usersService.create(email, password);
    return { message: 'User registered successfully', user };
  }

  async login(loginUserDto: LoginDto) {
    const { email, password } = loginUserDto;
    const user = await this.usersService.findByEmail(email);
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) throw new UnauthorizedException('Invalid credentials');

    const payload = { sub: user._id, email: user.email };
    const token = await this.jwtService.signAsync(payload);

    return {
      access_token: token,
      user_id: user._id, // Include the ObjectId of the logged-in user
      email: user.email, // Optional: include email if needed
    };
  }
}
