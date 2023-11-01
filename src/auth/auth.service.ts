import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  login() {
    return { message: 'I have signed in' };
  }
  signUp() {
    return { message: 'I have signed up' };
  }
}
