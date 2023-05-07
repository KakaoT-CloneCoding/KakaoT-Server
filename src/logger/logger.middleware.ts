import { Injectable, Logger, NestMiddleware } from "@nestjs/common";


@Injectable()
export class LoggerMiddleware implements NestMiddleware{
    private readonly logger = new Logger();

    use(req: any, res: any, next: (error?: any) => void) {
        const { method, originalUrl, ip, body } = req;
        
        res.on('finish', () => {
            const { statusCode, data } = res;

            this.logger.log(
                `REQUEST > ${method} ${originalUrl} ${ip} ${JSON.stringify(body)} \n`,
                `RESPONSE > ${statusCode} ${JSON.stringify(data)}`
            )
        })
        next();
    }
}