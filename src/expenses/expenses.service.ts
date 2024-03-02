import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';

@Injectable()
export class ExpensesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateExpenseDto, userId: string) {
    return this.prisma.expense.create({
      data: {
        userId,
        ...dto,
      },
    });
  }

  async update(dto: UpdateExpenseDto, expenseId: string, userId: string) {
    return this.prisma.expense.update({
      where: { id: expenseId, userId },
      data: {
        userId,
        ...dto,
      },
    });
  }

  findAll(userId: string) {
    return this.prisma.expense.findMany({ where: { userId } });
  }

  findOne(id: string, userId: string) {
    return this.prisma.expense.findUnique({ where: { id, userId } });
  }

  remove(id: string, userId: string) {
    return this.prisma.expense.delete({ where: { id, userId } });
  }
}
