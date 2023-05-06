import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { RequestService } from './request.service';
import { RequestRepository } from 'src/repository/request.repository';

@Module({
  providers: [ClientService, RequestService],
  controllers: [ClientController],
})
export class ClientModule {}
