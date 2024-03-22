import type { Category } from '@prisma/client';
export interface ExpenseVolume {
  month: number;
  week: number;
}

export interface CategoryOutput extends Omit<Category, 'expenses'> {
  volume: ExpenseVolume;
}
