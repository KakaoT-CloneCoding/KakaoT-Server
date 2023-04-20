import { PrismaService } from '../prisma/prisma.service';
import { Injectable } from "@nestjs/common";
import { Request } from '@prisma/client';
import { throwError } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
@Injectable()
export class RequestService {
    constructor(
        private readonly prisma: PrismaService
    ) { }
    
    async createRequest(user, orderNumber:string, clientRequestDto) {
        return this.prisma.request.create({
            data: {
                clientId: user.id,
                orderId: orderNumber,
                ...clientRequestDto,
                createdAt:Date()
            }
        });
    }

    createOrderNumber(onumber = null):string  {
        return onumber ?? uuidv4();
    }

    async getRequestByOrderId(orderId):Promise<Request> {
        const request = await this.prisma.request.findFirst({
            where: {
                orderId 
            }
        });

        if (request == null) throw new Error("존재하지 않는 주문입니다.")
        return request;
    }

}
