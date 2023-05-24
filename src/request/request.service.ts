import { RequestRepository } from '../repository/request.repository';
import { PrismaService } from '../prisma/prisma.service';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, User } from '@prisma/client';
import { throwError } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { ClientCreateRequestDto } from './dtos/client.request.dto';

@Injectable()
export class RequestService {
  constructor(
    private readonly requestRepository: RequestRepository, // private readonly prisma: PrismaService
  ) {}

  //   private createRequest(user, orderNumber: string, clientRequestDto) {
  //     this.requestRepository.create(user, orderNumber, clientRequestDto);
  //   }

  //   private createOrderNumber(onumber = null): string {
  //     return onumber ?? uuidv4();
  //   }

  // async getRequestByOrderId(orderId): Promise<Request | Error> {
  //   return this.requestRepository.getRequestByOrderIdOrError(orderId);
  // }

  //   private getRequests(user: User) {
  //     return this.requestRepository.getRequests(user);
  //   }

  async findRequestById(user: User, requestId: string) {
    if (!user) throw new UnauthorizedException('로그인 후 사용해주세요.');
    const request = await this.requestRepository.getRequestByOrderId(requestId);

    console.log(request);
    if (!request)
      throw new BadRequestException('존자하지 않는 request 입니다.');
  }

  async findRequests(user: User) {
    if (!user) throw new UnauthorizedException('로그인 후 사용해주세요.');
    return this.requestRepository.getRequests(user);
  }

  async createClientRequest(
    user: User,
    clientRequestDto: ClientCreateRequestDto,
  ) {
    try {
      const requestCheck =
        await this.requestRepository.getUnresolvedRequestsByUserId(user);
      const orderNumber = this.requestRepository.createOrderNumber();
      const request = await this.requestRepository.create(
        user,
        orderNumber,
        clientRequestDto,
      );
    } catch (e) {
      console.log(e);
      throw Error('등록에 실패하였습니다.');
    }
  }
}
