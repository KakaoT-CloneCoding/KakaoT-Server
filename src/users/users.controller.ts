import { PrismaService } from 'src/prisma/prisma.service';
import {  UserLoginRequestDto, UserLoginResponseDto } from './dtos/user.login.dto';
import { UsersService } from './users.service';
import { Controller, Post, Get, Headers, BadRequestException, Body, Req, Param } from '@nestjs/common';
import { ApiBody, ApiHeader, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { User } from './user.decorator';

@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
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
        required: true
    })
    async me(
        @User() user,
    ) {
        return this.usersService.getMe(user)
    }

    @Post('')
    @ApiOperation({ summary: '카카오 로그인 / 회원가입 API', description: '유저가 없을 시 생성하고 유저 정보를 리턴 / 유저가 있을 시 유저 정보 리턴' })
   
    @ApiBody({
        type: UserLoginRequestDto,
        description: '로그인 Body',
        required: true
    })
    kakaoLogin(
        @Body() userLoginDto: UserLoginRequestDto
    ): Promise<UserLoginResponseDto> {
        return this.usersService.kakao_login(userLoginDto);
    }


    @Post(':id')
    @ApiOperation({
        summary: 'PK로 아이디 받아오기 / 테스트용임', description: '유저 테이블의 PK를 파라미터로 넘기면 해당 아이디를 가진 정보 반환', responses: {
        }
    })
    @ApiResponse({
        type: UserLoginResponseDto,
        description: '유저정보 또는 에러',
    })
    @ApiParam({
        name: 'id',
        required: true,
        type:'number'

    })
    async testLogin(@Param('id') id) { 
        return this.usersService.testLogin(id)
    }

    // @Get()
    // async getMe() {
    //     const access = 'ZQdzIzSvfxg75iKwzRDHMR7WLM81Tg5K4TUcAPufCj11XAAAAYcFTaPF';
        
    // }
}
