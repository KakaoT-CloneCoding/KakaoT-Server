import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { RequestService } from '../request/request.service';
import { RequestRepository } from 'src/repository/request.repository';
import { RequestModule } from 'src/request/request.module';

@Module({
  imports: [RequestModule],
  providers: [ClientService],
  controllers: [ClientController],
})
export class ClientModule {}
