import { Module } from '@nestjs/common';
import { DriverService } from './driver.service';
import { DriverController } from './driver.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [DriverService],
  controllers: [DriverController]
})
export class DriverModule {}
