import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // POST /auth/logi
  @Post('/login')
  login(@Body() UserDto: CreateUserDto) {
    return this.authService.login(UserDto);
  }

  // POST /auth/rigestration
  @Post('/registration')
  registration(@Body() UserDto: CreateUserDto) {
    return this.authService.registration(UserDto);
  }
}
