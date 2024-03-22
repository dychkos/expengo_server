import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { createPaginator } from 'prisma-pagination';
import { Category, Expense, Prisma } from '@prisma/client';

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

  async findAll(userId: string) {
    return this.prisma.expense.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });
  }

  async findOne(id: string, userId: string) {
    return this.prisma.expense.findUnique({ where: { id, userId } });
  }

  async remove(id: string, userId: string) {
    return this.prisma.expense.delete({ where: { id, userId } });
  }

  async findPaginated(userId: string, page: number, perPage: number) {
    const paginate = createPaginator({ perPage });

    return paginate<Expense[], Prisma.ExpenseFindManyArgs>(
      this.prisma.expense,
      {
        where: {
          userId,
        },
        orderBy: {
          createdAt: 'desc',
        },
      },
      {
        page,
      },
    );
  }
}
