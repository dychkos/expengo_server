import { IsString, IsNotEmpty, MinLength, IsNumber } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  title: string;

  @IsString()
  @IsNotEmpty()
  iconName: string;

  @IsString()
  @IsNotEmpty()
  color: string;

  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  limit: number;

  @IsString()
  @IsNotEmpty()
  period: string;
}
