import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';

@Injectable()
export class ExpensesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateExpenseDto, userId: number) {
    return this.prisma.expense.create({
      data: {
        userId,
        ...dto,
      },
    });
  }

  async update(dto: UpdateExpenseDto, expenseId: number, userId: number) {
    return this.prisma.expense.update({
      where: { id: expenseId },
      data: {
        userId,
        ...dto,
      },
    });
  }

  findAll() {
    return this.prisma.expense.findMany();
  }

  findOne(id: number) {
    return this.prisma.expense.findUnique({ where: { id } });
  }

  remove(id: number) {
    return this.prisma.expense.delete({ where: { id } });
  }
}
