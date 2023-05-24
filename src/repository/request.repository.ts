import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class RequestRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(user, orderNumber, clientRequestDto) {
    return this.prisma.request.create({
      data: {
        orderId: orderNumber,
        ...clientRequestDto,
        client: {
          connect: {
            email: user.email,
          },
        },
      },
    });
  }

  async getRequestByOrderId(orderId) {
    const request = await this.prisma.request.findFirst({
      where: {
        orderId,
        accept: {},
      },
      include: {
        client: true,
        accept: true,
      },
    });
    return request;
  }

  async getRequestByOrderIdOrError(orderId) {
    const request = await this.prisma.request.findFirst({
      where: {
        orderId,
      },
    });
    return request ?? new Error('없는 요청입니다.');
  }

  async getUnresolvedRequestsByUserId(user: User) {
    return this.prisma.request.findFirst({
      where: {
        clientId: user.id,
      },
    });
  }

  async getRequests(user: User) {
    return this.prisma.request.findMany({
      where: {
        clientId: user.id,
      },
      include: {
        accept: true,
      },
    });
  }

  async getRequestAndAcceptByOrderId(orderId) {
    return this.prisma.request.findFirst({
      where: {
        orderId,
      },
      include: {
        accept: true,
      },
    });
  }

  createOrderNumber(onumber = null): string {
    return onumber ?? uuidv4();
  }
}
