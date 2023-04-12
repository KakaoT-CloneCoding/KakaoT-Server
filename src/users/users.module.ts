import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports:[HttpModule],
  providers: [{
    provide: 'KAKAO_GET_USER_INFO',
    useValue: `${process.env.KAKAO_GET_USER_INFO}`
  },
    UsersService, PrismaService,
   
  ],
  exports:[UsersService],
  controllers: [UsersController]
})
export class UsersModule {}
