import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";


export class SocketInterceptor implements NestInterceptor{
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        const socketHeader = context.switchToWs().getClient().Headers;
        console.log(socketHeader);
        
        if (!socketHeader.user) {
            throw new Error("not found");
        }

        return next.handle();

    }

}  