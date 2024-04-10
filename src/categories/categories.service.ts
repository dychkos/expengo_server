import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCategoryDto } from './dto/input/create-category.dto';
import { UpdateCategoryDto } from './dto/input/update-category.dto';
import { StatisticsService } from '../statistics/statistics.service';
import { HelpersService } from '../helpers/helpers.service';
import { Category } from '@prisma/client';
import { CategoryOutput } from './dto/output/index.dto';

@Injectable()
export class CategoriesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly stats: StatisticsService,
    private readonly helper: HelpersService,
  ) {}

  public async create(
    dto: CreateCategoryDto,
    userId: string,
  ): Promise<CategoryOutput> {
    const category = await this.prisma.category.create({
      data: {
        userId,
        ...dto,
      },
    });

    return this.appendDefaultFields(category);
  }

  public async update(
    dto: UpdateCategoryDto,
    categoryId: string,
    userId: string,
  ): Promise<CategoryOutput> {
    const { firstDayOfMonth, lastDayOfMonth } =
      this.helper.getStartAndEndOfMonth();

    const category = await this.prisma.category.update({
      where: { id: categoryId, userId },
      data: {
        userId,
        ...dto,
      },
      include: {
        expenses: {
          where: {
            createdAt: {
              gte: firstDayOfMonth.toDate(),
              lt: lastDayOfMonth.toDate(),
            },
          },
        },
      },
    });

    const { expenses, ...rest } = category;
    const volume = this.stats.calculateExpenses(expenses);

    return {
      ...rest,
      volume,
    };
  }

  public async findAll(userId: string): Promise<CategoryOutput[]> {
    const { firstDayOfMonth, lastDayOfMonth } =
      this.helper.getStartAndEndOfMonth();

    const categories = await this.prisma.category.findMany({
      where: { userId },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        expenses: {
          where: {
            createdAt: {
              gte: firstDayOfMonth.toDate(),
              lt: lastDayOfMonth.toDate(),
            },
          },
        },
      },
    });

    return categories.map((category): CategoryOutput => {
      const { expenses, ...rest } = category;
      const volume = this.stats.calculateExpenses(expenses);
      return { ...rest, volume };
    });
  }

  public async findOne(id: string, userId: string): Promise<CategoryOutput> {
    const { firstDayOfMonth, lastDayOfMonth } =
      this.helper.getStartAndEndOfMonth();

    const category = await this.prisma.category.findUnique({
      where: { id, userId },
      include: {
        expenses: {
          where: {
            createdAt: {
              gte: firstDayOfMonth.toDate(),
              lt: lastDayOfMonth.toDate(),
            },
          },
        },
      },
    });

    const { expenses, ...rest } = category;
    const volume = this.stats.calculateExpenses(expenses);

    return {
      ...rest,
      volume,
    };
  }

  public remove(id: string, userId: string) {
    return this.prisma.category.delete({ where: { id, userId } });
  }

  private appendDefaultFields(category: Category) {
    return {
      ...category,
      volume: {
        week: 0,
        month: 0,
      },
    };
  }
}
