import { RequestService } from './request.service';
import { User } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { RequestRepository } from 'src/repository/request.repository';
import { ClientCreateRequestDto } from './dtos/client.request.dto';

@Injectable()
export class ClientService {
    constructor(
        private readonly requestService: RequestService,
        private readonly requestRepository : RequestRepository
    ) { }

    async createRequest(user: User, clientRequestDto: ClientCreateRequestDto) { 
        try {
            const requestCheck = await this.requestRepository.getUnresolvedRequestsByUserId(user);
            const orderNumber = this.requestService.createOrderNumber();
            const request = await this.requestService.createRequest(user, orderNumber, clientRequestDto);
           
        } catch (e) {
            console.log(e);
            throw Error("등록에 실패하였습니다.");
        }
    }

    async test(user) {
        return this.requestRepository.getRequests(user);
    }

    // async checkStatus(user:User) {
    //     const userRequest = await this.requestRepository.getUnresolvedRequestsByUserId(user);
        
    //     if (userRequest != null) {
    //         return false;
    //     }
    // }

}

