import { ApiProperty } from "@nestjs/swagger";
import { IsLatitude, IsLongitude, IsString, isLongitude } from "class-validator";


export class ClientCreateRequestDto{
    @IsString({ message: '출발지 주소가 올바르지 않습니다.' })
    @ApiProperty({description: '출발지 주소'})
    departureAddress: string;

    @IsString({ message: '도착지 주소가 올바르지 않습니다.' })
    @ApiProperty({description: '도착지 주소'})
    destinationAddress: string;

    @IsLatitude({ message: '출발지 위도가 올바르지 않습니다.' })
    @ApiProperty({description:'출발지 위도'})
    departureLatitude: number;

    @IsLongitude({ message: '출발지 경도가 올바르지 않습니다.' })
    @ApiProperty({description:'출발지 경도'})
    departureLongitude: number;

    @IsLatitude({ message: '도착지 위도가 올바르지 않습니다.' })
    @ApiProperty({description:'도착지 위도'})
    destinationLatitude: number;

    @IsLongitude({ message: '도착지 경도가 올바르지 않습니다.' })
    @ApiProperty({description:'도착지 경도'})
    destinationLongitude: number;
}
