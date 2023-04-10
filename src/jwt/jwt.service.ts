import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { JWT_CONFIG_VALUES, JwtModuleOptions } from './jwt.interface';

@Injectable()
export class JwtService {
    constructor(
        @Inject(JWT_CONFIG_VALUES) private readonly configValues: JwtModuleOptions,
    ) { }
    decode(token): object | Error {
        try {
            return jwt.verify(token, this.configValues.secret_key );
        } catch (e) {
            throw new BadRequestException("올바르지 않은 유저입니다.");
        }
    }
     sign(payload: any): string {
        return jwt.sign(payload, this.configValues.secret_key);
    }
}
