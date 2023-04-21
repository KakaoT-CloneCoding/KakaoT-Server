import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";


@Injectable()
export class RequestRepository {
    constructor(
        private readonly prisma:PrismaService
    ) {
       
    }
    
    async create(user, orderNumber, clientRequestDto) {
        return this.prisma.request.create({
            data: {
                clientId: user.id,
                orderId: orderNumber,
                ...clientRequestDto,
                createdAt:Date()
            }
        });
    }

    async getRequestByOrderId(orderId) {
        const request = await this.prisma.request.findFirst({
            where: {
                orderId 
            }
        });
        return request;
    }

    async getRequestByOrderIdOrError(orderId) {
        const request = await this.prisma.request.findFirst({
            where: {
                orderId 
            }
        });
        return request ??  new Error("없는 요청입니다.");
    }
}