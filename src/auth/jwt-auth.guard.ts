import { ExecutionContext, HttpException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from './auth.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }
    return super.canActivate(context);
  }

  handleRequest(err, user, info) {
    if (err || !user) {
      if (info.name === 'TokenExpiredError') {
        throw new HttpException(
          {
            error: true,
            message: "Votre token n'est plus valide, veuillez le réinitialiser",
          },
          401,
        );
      } else if (info.name === 'JsonWebTokenError') {
        throw new HttpException(
          {
            error: true,
            message: "Le token envoyé n'est pas conforme",
          },
          401,
        );
      } else {
        //catch other unprecedented errors
        console.error(info);
        console.log(err);
        throw new HttpException(
          {
            error: true,
            message: "Le token envoyé n'est pas valide",
          },
          401,
        );
      }
    }
    return user;
  }
}
