import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { StatisticsService } from '../statistics/statistics.service';

@Module({
  providers: [CategoriesService, StatisticsService],
  controllers: [CategoriesController],
})
export class CategoriesModule {}
