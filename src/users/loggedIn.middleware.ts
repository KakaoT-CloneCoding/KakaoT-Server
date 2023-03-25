import { UsersService } from './users.service';
import { NestInterceptor } from '@nestjs/common/interfaces/features/nest-interceptor.interface';
import { NestMiddleware, Injectable, BadRequestException } from '@nestjs/common';
import { NextFunction } from 'express';

@Injectable()
export class LoggedInMiddleware implements NestMiddleware{
    constructor(private readonly usersService:UsersService) {}
    use(req: Request, res: Response, next: NextFunction) {
        const token = req.headers['access_token'];
        if (!token) throw new BadRequestException("로그인 해주세요");
        const decode = this.usersService.decode(token);
        req["user"] = decode;
        next();
    }
}