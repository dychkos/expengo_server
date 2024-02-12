import {
	BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthEntity } from './entity/auth.entity';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from '../users/dto/create-user.dto'
import { UsersService } from '../users/users.service'

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async login(email: string, password: string): Promise<AuthEntity> {
    const user = await this.usersService.findOneByEmail(email);

    if (!user) {
      throw new NotFoundException(`No user found for email: ${email}`);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    return {
      accessToken: this.jwtService.sign({ userId: user.id }),
    };
  }

	async register(userDto: CreateUserDto): Promise<AuthEntity> {

    if (await this.usersService.findOneByEmail(userDto.email)) {
			throw new BadRequestException('User with this email already exists.');
		}

    const user = await this.usersService.create(userDto);

    return {
      accessToken: this.jwtService.sign({ userId: user.id }),
    };
  }
}
