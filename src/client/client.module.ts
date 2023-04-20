import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { RequestService } from './request.service';

@Module({
  providers: [ClientService, RequestService],
  controllers: [ClientController],
})
export class ClientModule {}
