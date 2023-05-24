import { ClientCreateRequestDto } from './dtos/client.request.dto';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RequestService } from './request.service';
import { User } from 'src/users/user.decorator';
import { ApiHeader, ApiParam } from '@nestjs/swagger';

@Controller('requests')
export class RequestController {
  constructor(private readonly requestService: RequestService) {}

  @Get('/:requestId')
  @ApiHeader({
    description: '서버에서 발급한 access_token',
    name: 'access_token',
    required: true,
  })
  @ApiParam({
    name: 'requestId',
    required: true,
    description: 'RequestId(OrderId) ',
  })
  async findRequestInfo(@User() user, @Param('requestId') requestId: string) {
    this.requestService.findRequestById(user, requestId);
  }

  @Get('/')
  @ApiHeader({
    description: '서버에서 발급한 access_token',
    name: 'access_token',
    required: true,
  })
  async findRequest(@User() user) {
    return this.requestService.findRequests(user);
  }

  @Post('/')
  @ApiHeader({
    description: '서버에서 발급한 access_token',
    name: 'access_token',
    required: true,
  })
  async createRequest(
    @User() user,
    @Body() clientRequestDto: ClientCreateRequestDto,
  ) {
    this.requestService.createClientRequest(user, clientRequestDto);
  }
}
