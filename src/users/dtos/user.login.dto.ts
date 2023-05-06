import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEmpty, IsJWT, IsNumber, IsString, IsUrl } from "class-validator";

export class UserLoginRequestDto {
    @IsString({
        message:"access_token 에러"
    })
    @ApiProperty({description:'kakao api에서 받은 code'})
    readonly access_token: string;
}

export class UserInfo {

    @ApiProperty({description: 'primary key'})
    @IsNumber()
    readonly id?: number | undefined;

    @ApiProperty({description:'유저의 이메일'})
    @IsString()
    @IsEmail()
    readonly email: string;


    @ApiProperty({description:'유저의 닉네임'})
    @IsString()
    readonly nickname: string;
    
    @ApiProperty({ description: '유저 프로파일 이미지 url' })
    @IsString()
    @IsUrl()
    readonly profile_image_url: string;
}

export class UserLoginResponseDto {
    @ApiProperty({description:'유저의 이메일'})
    readonly email: string;

    @ApiProperty({description:'유저의 닉네임'})
    readonly nickname: string;

    @ApiProperty({description:'유저 프로파일 이미지 url'})
    readonly profile_image_url: string;

    @ApiProperty({description:'서버에서 발급한 jsonwebtoken'})
    readonly access_token: string;
}
