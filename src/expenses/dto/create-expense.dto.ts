import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString, MinLength, ValidateIf } from 'class-validator';

export class CreateExpenseDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  title: string;

  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  price: number;

  @IsString()
  @ValidateIf((object, value) => value !== null)
  categoryId: string | null;
}
