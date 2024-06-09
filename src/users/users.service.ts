import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
import { CategoriesService } from '@/categories/categories.service';
import { UserOutput } from '@/users/dto/output/index.dto';

export const roundsOfHashing = 10;

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private categoryService: CategoriesService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const roundsOfHashing = 10;
    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      roundsOfHashing,
    );
    createUserDto.password = hashedPassword;

    let defaultCategory = null;

    const user = await this.prisma.$transaction(async (prisma) => {
      const user = await prisma.user.create({
        data: createUserDto,
      });

      const defaultCategoryData = {
        ...this.categoryService.generateDefault(),
        userId: user.id as string,
      } as any;

      defaultCategory = await prisma.category.create({
        data: defaultCategoryData,
      });

      return user;
    });

    return await this.prisma.user.update({
      where: { id: user.id },
      data: {
        defaultCategoryId: defaultCategory.id
      },
    });
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  findOne(id: string) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  findOneByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    if (!updateUserDto) {
      throw new BadRequestException('Empty data in payload.');
    }

    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(
        updateUserDto.password,
        roundsOfHashing,
      );
    }

    return this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  remove(id: string) {
    return this.prisma.user.delete({ where: { id } });
  }
}
