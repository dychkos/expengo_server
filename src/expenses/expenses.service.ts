import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { createPaginator } from 'prisma-pagination';
import { Expense, Prisma } from '@prisma/client';
import { CategoriesService } from '@/categories/categories.service';

@Injectable()
export class ExpensesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly categoryService: CategoriesService,
  ) {}

  async create(dto: CreateExpenseDto, userId: string) {
    if (!dto.categoryId) {
      dto.categoryId = (await this.categoryService.getDefaultForUser(userId)).id;
    }
    return this.prisma.expense.create({
      data: {
        userId,
        ...dto,
      },
    });
  }

  async update(dto: UpdateExpenseDto, expenseId: string, userId: string) {
    if (!dto.categoryId) {
      dto.categoryId = (await this.categoryService.getDefaultForUser(userId)).id;
    }

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
          updatedAt: 'desc',
        },
      },
      {
        page,
      },
    );
  }
}
