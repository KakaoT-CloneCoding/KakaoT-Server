import { RequestRepository } from './../repository/request.repository';
import { PrismaService } from '../prisma/prisma.service';
import { Injectable } from "@nestjs/common";
import { Request, User } from '@prisma/client';
import { throwError } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class RequestService {
    constructor(
        private readonly requestRepository:RequestRepository
        // private readonly prisma: PrismaService
    ) { }
    
    createRequest(user, orderNumber:string, clientRequestDto) {
        this.requestRepository.create(user, orderNumber, clientRequestDto);
    }

    createOrderNumber(onumber = null):string  {
        return onumber ?? uuidv4();
    }

    getRequestByOrderId(orderId):Promise<Request | Error> {
        return this.requestRepository.getRequestByOrderIdOrError(orderId);
    }

    getRequests(user:User) {
        return this.requestRepository.getRequests(user);
    }

}
