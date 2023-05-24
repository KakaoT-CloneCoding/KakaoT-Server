import { UsersController } from './users/users.controller';
import { HttpModule } from '@nestjs/axios';
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { JwtModule } from './jwt/jwt.module';
import { JwtMiddleware } from './jwt/jwt.middleware';
import { ClientModule } from './client/client.module';
import { DriverModule } from './driver/driver.module';
import { PrismaModule } from './prisma/prisma.module';
import { RepositoryModule } from './repository/repository.module';
import { ChatGateway } from './chat/chat.gateway';
import { ChatModule } from './chat/chat.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggerInterceptor } from './logger/logger.interceptor';
import { RequestModule } from './request/request.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true,
      envFilePath: process.env.NODE_ENV === 'dev' ? '.env.dev' : '.env',
    }),
    // PrismaModule,
    UsersModule,
    JwtModule.forRoot({
      secret_key:process.env.JWT_SECRET_KEY
    }),
    ClientModule,
    DriverModule,
    RepositoryModule,
    ChatModule,
    RequestModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggerInterceptor
    }
  ],
  controllers: [],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
  
    // consumer.apply(LoggerMiddleware).forRoutes("*");
    consumer.apply(JwtMiddleware).forRoutes("*");
  }
}
