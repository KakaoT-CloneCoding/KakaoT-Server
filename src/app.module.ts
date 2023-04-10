import { UsersController } from './users/users.controller';
import { LoggerMiddleware } from './logger/logger.middleware';
import { HttpModule } from '@nestjs/axios';
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { JwtModule } from './jwt/jwt.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: process.env.NODE_ENV === 'prod' ? '.env' : '.env.dev',
      isGlobal:true,
    }),
    UsersModule,
    JwtModule.forRoot({
      secret_key:process.env.JWT_SECRET_KEY
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
  
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(LoggedInMiddleware).exclude(
    //   { path: '/users', method: RequestMethod.POST },
    // ).forRoutes(UsersController);
    consumer.apply(LoggerMiddleware).forRoutes("*");
  }
}
