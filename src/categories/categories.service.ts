import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateCategoryDto, userId: number) {
    return this.prisma.category.create({
      data: {
        userId,
        ...dto,
      },
    });
  }

  async update(dto: UpdateCategoryDto, categoryId: number, userId: number) {
    return this.prisma.category.update({
      where: { id: categoryId },
      data: {
        userId,
        ...dto,
      },
    });
  }

  findAll() {
    return this.prisma.category.findMany();
  }

  findOne(id: number) {
    return this.prisma.category.findUnique({ where: { id } });
  }

  remove(id: number) {
    return this.prisma.category.delete({ where: { id } });
  }
}
