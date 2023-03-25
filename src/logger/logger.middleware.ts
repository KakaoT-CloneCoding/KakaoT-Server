import { Injectable, Logger, NestMiddleware } from "@nestjs/common";


@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    private logger = new Logger("HTTP");
    use(req: any, res: any, next: (error?: any) => void) {

    const { ip, method, originalUrl } = req;
    const userAgent = req.get('user-agent') || '';
    res.on('finish', () => {
      const { statusCode } = res;
      this.logger.log(
        `${method} ${statusCode} - ${originalUrl} - ${ip} - ${userAgent}`,
      );
    });
        next();
    }

}