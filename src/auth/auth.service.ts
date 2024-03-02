import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { AuthEntity } from './entity/auth.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(email: string, password: string): Promise<AuthEntity> {
    const user = await this.usersService.findOneByEmail(email);

    if (!user) {
      throw new NotFoundException(`No user found for email: ${email}`);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    return this.signToken(user.id, user.email);
  }

  async register(userDto: CreateUserDto): Promise<AuthEntity> {
    if (await this.usersService.findOneByEmail(userDto.email)) {
      throw new BadRequestException('User with this email already exists.');
    }

    const user = await this.usersService.create(userDto);

    return this.signToken(user.id, user.email);
  }

  async signToken(userId: string, email: string): Promise<AuthEntity> {
    const payload = {
      sub: userId,
      email,
    };

    const token = await this.jwtService.signAsync(payload);

    return {
      accessToken: token,
    };
  }
}
