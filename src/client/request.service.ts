import { RequestRepository } from './../repository/request.repository';
import { PrismaService } from '../prisma/prisma.service';
import { Injectable } from "@nestjs/common";
import { Request } from '@prisma/client';
import { throwError } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class RequestService {
    constructor(
        private readonly requestRepository:RequestRepository
        // private readonly prisma: PrismaService
    ) { }
    
    async createRequest(user, orderNumber:string, clientRequestDto) {
        return this.requestRepository.create(user, orderNumber, clientRequestDto);
    }

    createOrderNumber(onumber = null):string  {
        return onumber ?? uuidv4();
    }

    async getRequestByOrderId(orderId):Promise<Request | Error> {
        return await this.requestRepository.getRequestByOrderIdOrError(orderId);
    }

}
