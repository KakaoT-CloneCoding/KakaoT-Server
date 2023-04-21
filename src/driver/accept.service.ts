import { AcceptRepository } from './../repository/accept.repository';
import { Injectable } from "@nestjs/common";
import { Roles } from "src/auth/roles.decorator";
import { PrismaService } from "src/prisma/prisma.service";
import { RequestRepository } from 'src/repository/request.repository';


@Injectable()
@Roles('driver')
  
export class AcceptService{

  constructor(
    private readonly acceptRepository: AcceptRepository,
    private readonly requestRepository: RequestRepository,
    ) { }
    
  async createAccept(user, orderId) {
    try {
      const request = await this.requestRepository.getRequestByOrderId(orderId);
      
      if (request == null) throw new Error("존재하지 않는 요청입니다.");

      const isAccept = await this.acceptRepository.isAcceptRequestId(request);
      
      if (isAccept) return "이미 수락된 요청입니다.";
      
      await this.acceptRepository.create(user, request);
      
      return true;
    } catch (e) {
      throw new Error(e);
    }
      // const createAccpet = this.acceptRepository.create();  
  }
}