import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'email@test.com', description: 'Email' })
  @IsString({ message: 'email must be string' })
  @IsEmail({}, { message: 'Invalid email addres' })
  readonly email: string;

  @ApiProperty({ example: 'password', description: 'Password' })
  @IsString({ message: 'password must be string' })
  @Length(4, 16, { message: 'password must be more than 4 and less than 16' })
  readonly password: string;
}
