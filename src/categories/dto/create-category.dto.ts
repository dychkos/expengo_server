import { IsString, IsNotEmpty, MinLength, IsNumber } from 'class-validator'

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
  limit: number;

	@IsString()
	@IsNotEmpty()
	period: string
}