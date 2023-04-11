import { JwtService } from './jwt.service';
import { Injectable, NestMiddleware } from "@nestjs/common";

@Injectable()
export class JwtMiddleware implements NestMiddleware {
    constructor(
        private readonly jwt:JwtService
    ) {}
    async use(req: Request, res: Response, next: (error?: any) => void) {
        const access_token = req.headers["access_token"];
        if (!access_token) { console.log("false"); next(); return; }
        const decode = this.jwt.decode(access_token);
        req["user"] = decode;
        next();
    }
}