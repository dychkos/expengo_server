import { Module } from '@nestjs/common';
import { CategoriesService } from '@/categories/categories.service';
import { StatisticsModule } from '@/statistics/statistics.module';
import { CategoriesController } from '@/categories/categories.controller';

@Module({
  providers: [CategoriesService],
  exports: [CategoriesService],
  controllers: [CategoriesController],
  imports: [StatisticsModule],
})
export class CategoriesModule {}
