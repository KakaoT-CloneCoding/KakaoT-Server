import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEmpty, IsJWT, IsNumber, IsString, IsUrl } from "class-validator";

export class UserLoginRequestDto {
    @IsString()
    @ApiProperty({description:'kakao api에서 받은 code'})
    readonly code: string;
}

export class UserInfo {
    @IsNumber()
    readonly id?: number | undefined;

    @IsString()
    @IsEmail()
    @ApiProperty({description:'유저의 이메일'})
    readonly email: string;

    @IsString()
    @ApiProperty({description:'유저의 닉네임'})
    readonly nickname: string;

    @IsString()
    @IsUrl()
    @ApiProperty({description:'유저 프로파일 이미지 url'})
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
