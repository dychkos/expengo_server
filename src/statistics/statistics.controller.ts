import {
  Controller,
  Get,
  ParseBoolPipe,
  ParseIntPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { JwtAuthGuard } from '../auth/guard';
import { GetUser } from '../auth/decorator';
import { GenerateStatsDto } from './dto/generate-stats.dto';

@UseGuards(JwtAuthGuard)
@Controller('statistics')
export class StatisticsController {
  constructor(private readonly service: StatisticsService) {}

  @Get()
  getStats(
    @Query() dto: GenerateStatsDto,
    @GetUser('id')
    userId: string,
  ) {
    return this.service.generateStats(
      userId,
      dto.targetYear,
      dto.targetMonth,
      dto.forWeek,
    );
  }
}
