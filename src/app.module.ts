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
import { ClientModule } from './client/client.module';
import { DriverModule } from './driver/driver.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true,
      envFilePath: process.env.NODE_ENV === 'dev' ? '.env.dev' : '.env',
    }),
    RolesModule,
    UsersModule,
    JwtModule.forRoot({
      secret_key:process.env.JWT_SECRET_KEY
    }),
    ClientModule,
    DriverModule,
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
