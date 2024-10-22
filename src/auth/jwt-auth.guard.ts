import { Injectable,ExecutionContext,UnauthorizedException  } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    handleRequest(err, user, info, context: ExecutionContext) {
        if (err || !user) {
          console.log('Authorization Error:', info); // Ini akan log alasan kenapa gagal
          throw err || new UnauthorizedException(info.message);
        }
        return user;
      }
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    console.log('Authorization Header:', request.headers.authorization); // Log header untuk debugging
    return super.canActivate(context);
  }
}
