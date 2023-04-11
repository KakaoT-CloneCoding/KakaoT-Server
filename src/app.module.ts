import { UsersController } from './users/users.controller';
import { LoggerMiddleware } from './logger/logger.middleware';
import { HttpModule } from '@nestjs/axios';
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { JwtModule } from './jwt/jwt.module';
import { RolesModule } from './auth/roles.module';
import { JwtMiddleware } from './jwt/jwt.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: process.env.NODE_ENV === 'prod' ? '.env' : '.env.dev',
      isGlobal:true,
    }),
    RolesModule,
    UsersModule,
    JwtModule.forRoot({
      secret_key:process.env.JWT_SECRET_KEY
    }),
  ],
  providers: [AppService],
  controllers: [AppController],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
  
    consumer.apply(LoggerMiddleware).forRoutes("*");
    consumer.apply(JwtMiddleware).forRoutes("*");
  }
}
