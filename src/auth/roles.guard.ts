import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { ROLES_KEY } from './roles-auth.decorator';
import { Role } from 'src/roles/roles.model';

@Injectable()
export class RolesdGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
  ) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const requiredRoles = this.reflector.getAllAndOverride<string[]>(
        ROLES_KEY,
        [context.getHandler(), context.getClass()],
      );
      if (!requiredRoles) {
        // если нету ролей тогда эта функция доступна всем
        return true;
      }

      const req = context.switchToHttp().getRequest();
      const authHeader = req.headers.authorization;
      const bearer = authHeader.split(' ')[0];
      const token = authHeader.split(' ')[1];

      if (bearer !== 'Bearer' || !token) {
        throw new UnauthorizedException('Пользователь не авторизован');
      }

      const user = this.jwtService.verify(token);
      req.user = user;
      return user.roles.some((role: Role) =>
        requiredRoles.includes(role.value),
      );
    } catch (error) {
      console.log('JWT guard~ error:', error);
      throw new HttpException(
        'У тебя нету прав для выполнения этого действия',
        HttpStatus.FORBIDDEN,
      );
    }
  }
}
