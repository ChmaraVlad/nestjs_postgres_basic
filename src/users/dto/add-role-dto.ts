import { IsNumber, IsString } from 'class-validator';

export class AddRoleDto {
  @IsString({ message: 'Must be a string' })
  readonly userId: number;
  @IsNumber({}, { message: 'Must be a number' })
  readonly value: string;
}
