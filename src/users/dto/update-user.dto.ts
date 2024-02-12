import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class UpdateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

	@IsString()
  @IsNotEmpty()
  firstName: string;

	
	@IsString()
  @IsNotEmpty()
  lastName: string;
}