import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'email@test.com', description: 'Email' })
  readonly email: string;

  @ApiProperty({ example: 'password', description: 'Password' })
  readonly password: string;
}
