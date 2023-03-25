import { UsersController } from './users/users.controller';
import { LoggerMiddleware } from './logger/logger.middleware';
import { LoggedInMiddleware } from './users/loggedIn.middleware';
import { HttpModule } from '@nestjs/axios';
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: process.env.NODE_ENV === 'prod' ? '.env' : '.env.dev',
      isGlobal:true,
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
  
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggedInMiddleware).exclude(
      { path: '/users', method: RequestMethod.POST },
    ).forRoutes(UsersController);
    consumer.apply(LoggerMiddleware).forRoutes("*");
  }
}
