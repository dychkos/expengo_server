import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { GetUser } from '@/auth/decorator';
import { JwtAuthGuard } from '@/auth/guard';
import { UsersService } from '@/users/users.service';
import { UpdateUserDto } from '@/users/dto/update-user.dto';

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
