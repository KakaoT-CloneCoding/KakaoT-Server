import { ClientCreateRequestDto } from './dtos/client.request.dto';
import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { RequestService } from './request.service';
import { User } from 'src/users/user.decorator';
import {
  ApiHeader,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
} from '@nestjs/swagger';

@Controller('requests')
@ApiHeader({
  description: '서버에서 발급한 access_token',
  name: 'access_token',
  required: true,
})
export class RequestController {
  constructor(private readonly requestService: RequestService) {}

  @Get('/:requestId')
  @ApiParam({
    name: 'requestId',
    required: true,
    description: 'RequestId(OrderId) ',
  })
  @ApiOperation({
    summary: 'requestId에 해당하는 요청 가져오기',
    description: '내 요청 중 requestId에 해당하는 요청 가져오기',
  })
  async findRequestInfo(@User() user, @Param('requestId') requestId: string) {
    this.requestService.findRequestById(user, requestId);
  }

  @Get('/')
  @ApiOperation({
    summary: '내 모든 요청 가져오기',
    description: '내 모든 요청 가져오기',
  })
  async findRequest(@User() user) {
    return this.requestService.findRequests(user);
  }

  @Post('/')
  @ApiOperation({
    summary: '요청 등록하기',
    description: '요청 등록하기',
  })
  async createRequest(
    @User() user,
    @Body() clientRequestDto: ClientCreateRequestDto,
  ) {
    return this.requestService.createClientRequest(user, clientRequestDto);
  }

  @Delete('/:requestId')
  @ApiOkResponse()
  async deleteRequest(@User() user, @Param('requestId') requestId: string) {
    return this.requestService.delete(user, requestId);
  }
}
