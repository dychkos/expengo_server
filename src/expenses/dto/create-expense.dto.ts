import { IsString, IsNotEmpty, MinLength, IsNumber } from 'class-validator'

export class CreateExpenseDto {
	@IsString()
  @IsNotEmpty()
  @MinLength(3)
  title: string;

	@IsNumber()
  price: number;

	@IsNumber()
  categoryId: number;
}