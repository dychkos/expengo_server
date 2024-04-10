import { IsBoolean, IsNumber, Max, Min } from 'class-validator';

export class GenerateStatsDto {
  @IsNumber()
  @Min(0)
  @Max(11)
  targetMonth: number;

  @IsNumber()
  @Min(2000)
  @Max(2100)
  targetYear: number;

  @IsBoolean()
  forWeek: boolean;
}
