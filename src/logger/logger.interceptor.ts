import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from "@nestjs/common";
import { Observable, tap } from "rxjs";


@Injectable()
export class LoggerInterceptor implements NestInterceptor{
    private readonly logger = new Logger('HTTP');
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        const request = context.switchToHttp().getRequest();
        const { method, originalUrl, ip, body } = request;
        
        return next.handle().pipe(
            tap((data) => {
                const response = context.switchToHttp().getResponse();
                const { satasCode } = request;
                this.logger.log(`${JSON.stringify(data)}`);
            }),
          );
    }
}