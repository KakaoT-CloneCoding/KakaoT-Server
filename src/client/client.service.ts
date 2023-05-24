import { RequestService } from '../request/request.service';
import { User } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { RequestRepository } from 'src/repository/request.repository';
import { ClientCreateRequestDto } from '../request/dtos/client.request.dto';

@Injectable()
export class ClientService {
  constructor() {} // private readonly requestRepository: RequestRepository, // private readonly requestService: RequestService,

  async test(user) {
    // return this.requestRepository.getRequests(user);
  }
}
