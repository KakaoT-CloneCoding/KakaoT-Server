import { AcceptRepository } from './../repository/accept.repository';
import { Injectable } from "@nestjs/common";
import { Roles } from "src/auth/roles.decorator";
import { PrismaService } from "src/prisma/prisma.service";
import { RequestRepository } from 'src/repository/request.repository';


@Injectable()
export class AcceptService{

  constructor(
    private readonly acceptRepository: AcceptRepository,
    private readonly requestRepository: RequestRepository,
    ) { }
    
  async createAccept(user, orderId) {
    try {
      const request = await this.requestRepository.getRequestAndAcceptByOrderId(orderId);
      console.log(request);
      if (request == null) throw new Error("존재하지 않는 요청입니다.");

      if (request.accept) throw new Error("이미 수락된 요청입니다.")

      await this.acceptRepository.create(user, request);

      return true;
    } catch (e) {
      return e;
    }
  }
}