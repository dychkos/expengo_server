import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CategoriesModule } from './categories/categories.module';
import { ExpensesModule } from './expenses/expenses.module';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { StatisticsModule } from './statistics/statistics.module';
import { HelpersModule } from './helpers/helpers.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    UsersModule,
    UsersModule,
    CategoriesModule,
    ExpensesModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    StatisticsModule,
    HelpersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
