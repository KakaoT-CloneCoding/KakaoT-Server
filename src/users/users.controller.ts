import { UserLoginDto } from './dtos/user.login.dto';
import { UsersService } from './users.service';
import { Controller, Post, Get, Headers, BadRequestException, Body } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiHeaders, ApiResponse } from '@nestjs/swagger';
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    // @Get('/me')
    // async getUser(
    //     @Headers('Authorization') token
    // ) {
    //     if (!token) throw new BadRequestException("로그인 해주세요!");
    //     return this.usersService.getUserByAccessToken(token);
    // }
    @Post('')
    @ApiResponse({
        description: '카카오 로그인 / 회원가입 API'
    })
    @ApiBody({
        type : UserLoginDto
    })
    kakaoLogin(
        @Body()  userLoginDto: UserLoginDto
    ): Promise<String | Error> {
        return this.usersService.kakao_login(userLoginDto);
    }

    // @Get()
    // async getMe() {
    //     const access = 'ZQdzIzSvfxg75iKwzRDHMR7WLM81Tg5K4TUcAPufCj11XAAAAYcFTaPF';
        
    // }
    
}
