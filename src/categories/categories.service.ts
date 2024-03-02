import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateCategoryDto, userId: string) {
    return this.prisma.category.create({
      data: {
        userId,
        ...dto,
      },
    });
  }

  async update(dto: UpdateCategoryDto, categoryId: string, userId: string) {
    return this.prisma.category.update({
      where: { id: categoryId, userId },
      data: {
        userId,
        ...dto,
      },
    });
  }

  findAll(userId: string) {
    return this.prisma.category.findMany({ where: { userId } });
  }

  findOne(id: string, userId: string) {
    return this.prisma.category.findUnique({ where: { id, userId } });
  }

  remove(id: string, userId: string) {
    return this.prisma.category.delete({ where: { id, userId } });
  }
}
