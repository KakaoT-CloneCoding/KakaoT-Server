import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class UserLoginDto {
    @IsString()
    @ApiProperty({type: String, description: '카카오에서 받은 auth에 사용 될 code'})
    readonly code: string;
}