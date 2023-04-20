import { JwtService } from './../jwt/jwt.service';
import { AxiosError } from './../../node_modules/axios/index.d';
import { UserInfo, UserLoginRequestDto, UserLoginResponseDto } from './dtos/user.login.dto';
import { Injectable, BadRequestException, Inject } from '@nestjs/common';
import { User } from '@prisma/client';
import { HttpService } from '@nestjs/axios';
import { catchError, lastValueFrom } from 'rxjs';
import { UserRepository } from 'src/repository/user.repository';
@Injectable()
export class UsersService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly http: HttpService,
        private readonly jwtService: JwtService,
        @Inject('KAKAO_GET_USER_INFO') private readonly kakaoUserInfoUrl: string,
    ) {
        console.log(kakaoUserInfoUrl);
    }

    // async findUserOrNull(email: string): Promise<User | Error> {
    //     const user = await  this.prisma.user.findUnique({
    //         where: {email}
    //     });
    //     return user ?? null;
    // }

    // async getUserByAccessToken(token: string) {
    //     const decode = this.jwtService.decode(token) as any;
    //     const user = await this.prisma.user.findUnique({
    //         where: { email: decode.email }
    //     });
    //     return user;
    // }

    // async register(data: UserInfo) {
    //     return this.prisma.user.upsert({
    //         where: {
    //             email: data.email
    //         },
    //         update: { ...data },
    //         create: { ...data },
    //     });
    // }

    async getMe(user) {
        return this.userRepository.getUserByEmail(user.email);
    }

    async kakao_login(userLoginDto: UserLoginRequestDto): Promise<UserLoginResponseDto> {
        // const kakao_me = process.env.KAKAO_GET_USER_INFO;
        // const { access_token } = await this.getKakaoAccessToken(userLoginDto.access_token);
        const { access_token } = userLoginDto;
        try { 
            const { data } = await lastValueFrom(
                this.http.get(this.kakaoUserInfoUrl, {
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
            const user = await this.userRepository.register(userInfo);
            return { ...user, access_token: this.jwtService.sign(user) };
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

}
