import { DynamicModule, Global, Module } from '@nestjs/common';
import { JwtService } from './jwt.service';
import { JWT_CONFIG_VALUES, JwtModuleOptions } from './jwt.interface';

@Module({})
@Global()
export class JwtModule {
  static forRoot(options: JwtModuleOptions): DynamicModule {
    return {
      module:JwtModule,
      providers: [
        {
          provide: JwtService,
          useClass:JwtService,
        },
        {
          provide: JWT_CONFIG_VALUES,
          useValue: options,
        }
      ],
      exports: [
        JwtService
      ]
    }
  }
}
