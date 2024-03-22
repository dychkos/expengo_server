import {Body, Controller, Get, Patch, UseGuards} from '@nestjs/common';
import { GetUser } from 'src/auth/decorator';
import { JwtAuthGuard } from 'src/auth/guard';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Get('me')
  getMe(@GetUser('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch('me')
  update(@GetUser('id') id: string, @Body() dto: UpdateUserDto) {
    return this.service.update(id, dto);
  }
}
