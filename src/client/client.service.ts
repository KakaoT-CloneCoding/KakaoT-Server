import { RequestService } from './request.service';
import { User } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ClientService {
    constructor(
        private readonly requestService:RequestService,
    ) { }

    async createRequest(user: User, clientRequestDto: ClientRequestDto) { 
        try {
            const orderNumber = this.requestService.createOrderNumber();
            const request = await this.requestService.createRequest(user, orderNumber, clientRequestDto);
            //socket 연결 
            return true;
        } catch (e) {
            throw Error("등록에 실패하였습니다.");
        }
    }
}

