import { Injectable, NestMiddleware, ForbiddenException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
      throw new ForbiddenException('Authorization header is missing');
    }

    next();
  }
}


// export function CheckAutorization(req: Request, res: Response, next: NextFunction) {
//   const authHeader = req.headers['authorization'];

//   if (!authHeader) {
//     throw new ForbiddenException('Authorization header is missing');
//   }

//   next();
// }