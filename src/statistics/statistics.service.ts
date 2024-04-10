import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Expense } from '@prisma/client';
import moment from 'moment';
import { ExpenseVolume } from '../categories/dto/output/index.dto';

@Injectable()
export class StatisticsService {
  constructor(private readonly prisma: PrismaService) {}

  public generateStats(
    userId: string,
    targetYear: number = moment().year(),
    targetMonth: number = moment().month(),
    forWeek: boolean = false,
  ) {}

  public calculateMonthlyExpenses(
    expenses: Expense[],
    targetYear: number = moment().month(),
    targetMonth: number = moment().year(),
  ): ExpenseVolume {
    expenses = this.filterByYearAndMonth(expenses, targetYear, targetMonth);

    return this.calculateExpenses(expenses);
  }

  calculateExpenses(expenses: Expense[]): ExpenseVolume {
    if (!expenses) {
      return {
        month: 0,
        week: 0,
      };
    }

    return {
      month: this.sumExpenseVolume(expenses),
      week: this.sumExpenseVolume(this.filterByCurrentWeek(expenses, 1)),
    };
  }

  private sumExpenseVolume(expenses: Expense[]): number {
    return expenses.reduce((acc, item) => {
      acc += Number(item.price);
      return acc;
    }, 0);
  }

  private filterByCurrentWeek(
    expenses: Expense[],
    weekStartDay: number,
  ): Expense[] {
    // Get the current date and time
    const now = new Date();

    // Get the day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
    const dayOfWeek = now.getDay();

    // Calculate the difference between the current day and the desired start day of the week
    // This handles the wrap-around case where the current day is before the start day
    const diff = (dayOfWeek - weekStartDay + 7) % 7;

    // Calculate the start of the current week
    const startOfCurrentWeek = new Date(now);
    startOfCurrentWeek.setDate(now.getDate() - diff); // Subtract the difference to get the start day
    startOfCurrentWeek.setHours(0, 0, 0, 0); // Set the time to the start of the day (00:00:00)

    // Calculate the end of the current week (7 days after the start of the week)
    const endOfCurrentWeek = new Date(startOfCurrentWeek);
    endOfCurrentWeek.setDate(startOfCurrentWeek.getDate() + 7);
    endOfCurrentWeek.setHours(0, 0, 0, 0); // Set the time to the start of the day (00:00:00)

    // Filter the expenses array to keep only the expenses whose createdAt date falls within the current week range
    return expenses.filter((_ob_) => {
      const createdAtDate = new Date(_ob_.createdAt);
      return (
        createdAtDate >= startOfCurrentWeek && createdAtDate < endOfCurrentWeek
      );
    });
  }

  private filterByYear(expenses: Expense[], targetYear: number): Expense[] {
    return expenses.filter((expense) => {
      const expenseDate = new Date(expense.createdAt);
      return expenseDate.getFullYear() === targetYear;
    });
  }

  private filterByYearAndMonth(
    expenses: Expense[],
    targetYear: number,
    targetMonth: number,
  ): Expense[] {
    return expenses.filter((expense) => {
      const expenseDate = new Date(expense.createdAt);
      return (
        expenseDate.getMonth() === targetMonth &&
        expenseDate.getFullYear() === targetYear
      );
    });
  }
}
