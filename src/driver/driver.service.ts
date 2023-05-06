import { Accept } from './../../node_modules/.prisma/client/index.d';
import { User } from '@prisma/client';
import { AcceptRepository } from './../repository/accept.repository';
import { AcceptService } from './accept.service';
import { Injectable } from '@nestjs/common';
import { RequestRepository } from 'src/repository/request.repository';

@Injectable()
export class DriverService {
    constructor(
        private readonly acceptRepository: AcceptRepository,
        private readonly requestRepository: RequestRepository,
        private readonly acceptService : AcceptService
    ) {

    }

    async createAccept(user:User, orderId: String) {
        // const isRequest = await this.requestRepository.getRequestAndAcceptByOrderId(orderId);
        // console.log(isRequest);
        const isAccept = await this.acceptService.createAccept(user, orderId)
        console.log(isAccept);
        
    }
}
