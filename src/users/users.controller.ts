import { Controller, Get, UseGuards } from '@nestjs/common'
import { GetUser } from 'src/auth/decorator'
import { JwtAuthGuard } from 'src/auth/guard'
import { UsersService } from './users.service'

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
	constructor(
		private readonly service: UsersService
	){}

	@Get('me')
	getMe(@GetUser('id') id: string) {
		return this.service.findOne(id);
	}
}
