import { Module } from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { ExpensesController } from './expenses.controller';
import { CategoriesModule } from '@/categories/categories.module';

@Module({
  providers: [ExpensesService],
  controllers: [ExpensesController],
  imports: [CategoriesModule],
})
export class ExpensesModule {}
