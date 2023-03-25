import { PrismaService } from 'src/prisma.service';
import {  UserLoginRequestDto, UserLoginResponseDto } from './dtos/user.login.dto';
import { UsersService } from './users.service';
import { Controller, Post, Get, Headers, BadRequestException, Body, Req } from '@nestjs/common';
import {  ApiBody,  ApiHeader,  ApiOperation, ApiResponse } from '@nestjs/swagger';
@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
        private readonly prismaService:PrismaService
    ) { }
    
    // @Get('/me')
    // async getUser(
    //     @Headers('Authorization') token
    // ) {
    //     if (!token) throw new BadRequestException("로그인 해주세요!");
    //     return this.usersService.getUserByAccessToken(token);
    // }

    @Get('/me')
    @ApiHeader({
        description: '로그인 시 필요한 token',
        name: 'access_token',
        required:true
    })
    async me(
        @Req() req,
        @Headers() headers,
    ) {
        const user = this.prismaService.user.findUnique({
            where: {
                email: req["user"].email
            }
        });
        console.log(user);
        return user;
    }


    @Post('')
    @ApiOperation({ summary: '카카오 로그인 / 회원가입 API', description:'유저가 없을 시 생성하고 유저 정보를 리턴 / 유저가 있을 시 유저 정보 리턴'})
    @ApiResponse({
        type: UserLoginResponseDto,
        description: '유저정보 또는 에러',
    })
        
    @ApiBody({
        type: UserLoginRequestDto,
        description: '로그인 Body',
        required:true
    })
    kakaoLogin(
        @Body()  userLoginDto: UserLoginRequestDto
    ): Promise<UserLoginResponseDto> {
        return this.usersService.kakao_login(userLoginDto);
    }

    // @Get()
    // async getMe() {
    //     const access = 'ZQdzIzSvfxg75iKwzRDHMR7WLM81Tg5K4TUcAPufCj11XAAAAYcFTaPF';
        
    // }
    
}
