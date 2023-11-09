import { IsNumber, IsString, Length } from 'class-validator';

export class CreatePostDto {
  @IsString({ message: 'email must be string' })
  readonly title: string;

  @IsString({ message: 'password must be string' })
  @Length(2, 10000, {
    message: 'password must be more than 4 and less than 16',
  })
  readonly content: string;

  @IsNumber({}, { message: 'userId must be string' })
  @Length(2, 10000, {
    message: 'password must be more than 4 and less than 16',
  })
  readonly userId: number;
}
