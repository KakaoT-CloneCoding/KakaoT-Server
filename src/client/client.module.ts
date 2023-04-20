import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { RequestService } from './request.service';

@Module({
  providers: [ClientService, RequestService],
  controllers: [ClientController],
})
export class ClientModule {}
