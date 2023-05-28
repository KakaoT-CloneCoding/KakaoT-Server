import { ApiProperty, OmitType } from '@nestjs/swagger';
import { Role, User } from '@prisma/client';
import {
  IsEmail,
  IsEmpty,
  IsEnum,
  IsNotEmpty,
  IsString,
  IsUrl,
} from 'class-validator';

export class UserUpdateRequestDto {
  @ApiProperty({ description: '유저의 닉네임' })
  @IsString()
  @IsNotEmpty()
  nickname?: string;

  @ApiProperty({ description: '프로필 사진 이미지 주소' })
  @IsString()
  @IsUrl()
  profile_image_url?: string;

  @ApiProperty({ description: 'role : client / driver' })
  @IsEnum(Role)
  @IsNotEmpty()
  role: Role;
}
