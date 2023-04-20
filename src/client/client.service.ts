import { User } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ClientService {
    constructor(
        private readonly prissma: PrismaService
    ) { }

    async request(user: User, clientRequestDto: ClientRequestDto) { 
        try {
            const request = this.prissma.request.create({
                data: {
                    clientId: user.id,
                    ...clientRequestDto,
                    createdAt:Date()
                }
            });
            //socket 연동 
        } catch (e) {
            throw Error("등록에 실패하였습니다.");
        }
        
    }
}

