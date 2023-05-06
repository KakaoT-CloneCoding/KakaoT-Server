import { Module } from '@nestjs/common';
import { DriverService } from './driver.service';
import { DriverController } from './driver.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { AcceptService } from './accept.service';

@Module({
  providers: [DriverService, AcceptService],
  controllers: [DriverController]
})
export class DriverModule {}
