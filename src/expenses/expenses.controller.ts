import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { GetUser } from '../auth/decorator';
import { JwtAuthGuard } from '../auth/guard';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { ExpensesService } from './expenses.service';

@UseGuards(JwtAuthGuard)
@Controller('expenses')
export class ExpensesController {
  constructor(private readonly service: ExpensesService) {}

  @Get()
  index(
    @Query('targetYear') targetYear: number,
    @Query('targetMonth') targetMonth: number,
    @GetUser('id') userId: string,
  ) {
    return this.service.findAll(userId, targetYear, targetMonth);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@GetUser('id') userId: string, @Body() dto: CreateExpenseDto) {
    return this.service.create(dto, userId);
  }

  @Get(':id')
  show(@GetUser('id') userId: string, @Param('id') id: string) {
    return this.service.findOne(id, userId);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateExpenseDto,
    @GetUser('id') userId: string,
  ) {
    return this.service.update(dto, id, userId);
  }

  @Delete(':id')
  remove(@GetUser('id') userId: string, @Param('id') id: string) {
    return this.service.remove(id, userId);
  }
}
