import { AxiosError } from './../../node_modules/axios/index.d';
import { UserInfo, UserLoginRequestDto, UserLoginResponseDto } from './dtos/user.login.dto';
import { PrismaService } from './../prisma.service';
import { Injectable, BadRequestException } from '@nestjs/common';
import { User } from '@prisma/client';
import * as jwt from 'jsonwebtoken';
import { HttpService } from '@nestjs/axios';
import { catchError, lastValueFrom } from 'rxjs';
const private_key = `${ process.env.JWT_SECRET_KEY }`;
@Injectable()
export class UsersService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly http: HttpService
    ) { }

    async findUserOrNull(email: string): Promise<User | Error> {
        const user = await  this.prisma.user.findUnique({
            where: {email}
        });
        return user ?? null;
    }
    
    async getUserByAccessToken(token: string) { 
        const decode = this.decode(token) as any;
        const user = await this.prisma.user.findUnique({
            where: { email: decode.email }
        });
        return user;
    }

    async register(data: UserInfo) {
        return this.prisma.user.upsert({
            where: {
                email: data.email
            },
            update: { ...data },
            create: { ...data },
        });
    }

    async kakao_login(userLoginDto: UserLoginRequestDto): Promise<UserLoginResponseDto> {
        const kakao_me = process.env.KAKAO_GET_USER_INFO;
        const { access_token } = userLoginDto;
        // const {access_token} = await this.getKakaoAccessToken(code);
        try { 
            const { data } = await lastValueFrom(
                this.http.get(kakao_me, {
                    headers: {
                        Authorization: `Bearer ${access_token}`
                    }
                })
            );
            const email = data.kakao_account.email;
            const { nickname, profile_image_url } = data.kakao_account.profile;
            const userInfo:UserInfo = {
                email,
                nickname,
                profile_image_url
            };
            const user = await this.register(userInfo);
            return { ...user, access_token: this.sign(userInfo) };
        } catch (e) {
            console.log(e);
            throw new BadRequestException("존재하지 않는 사용자입니다.")
        }
    }
  

    async getKakaoAccessToken(code: string) {
        const url = process.env.KAKAO_OUATH_TOKEN_URL;
        const grant_type = process.env.KAKAO_OAUTH_GRANT_TYPE;
        const client_id = process.env.KAKAO_CLIENT_ID;
        const redirect_uri = process.env.KAKAO_REDIRECT_URI;
        const headers = {
            'Content-type':'application/x-www-form-urlencoded;charset=utf-8'
        }
        try {
            const {data}: any = await lastValueFrom(this.http.post(url, {
                grant_type,
                client_id,
                redirect_uri,
                code
            }, {
                headers
            }).pipe(
                catchError((error: AxiosError) => {
                    console.log(error)
                    throw 'An error happened!';
                }),
            ));
            return data;
        } catch (e) {
            return new BadRequestException("잘못된 요청입니다.")
        }
    }

    public decode(token): object | Error {
        try {
            return jwt.verify(token,private_key);
        } catch (e) {
            throw new BadRequestException("올바르지 않은 유저입니다.");
        }
    }
    public sign(payload: any): string {
        return jwt.sign(payload, private_key);
    }
}
