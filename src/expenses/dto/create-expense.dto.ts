import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString, MinLength } from 'class-validator';

export class CreateExpenseDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  title: string;

  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  price: number;

  @IsString()
  categoryId: string;
}
