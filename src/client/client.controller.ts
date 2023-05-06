import { Roles } from 'src/auth/roles.decorator';
import { ClientService } from './client.service';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { User } from 'src/users/user.decorator';
import { ClientCreateRequestDto } from './dtos/client.request.dto';

@Controller('client')
export class ClientController {
    constructor(
        private readonly clientService: ClientService,
    ) { }
    
    @Post('request')
    async request(
        @User() user,
        @Body() clientRequestDto: ClientCreateRequestDto
    ) {
        return this.clientService.createRequest(user, clientRequestDto);
    }

    
    @Get('')
    async findClientRequest(@User() user) {
        return this.clientService.test(user);
    }
    // @Get('request/:id')
    // async myRequest(
    //     @User() user,
    //     @Param('id') id: string){ 
    //     return this.clientService.createRequest();
    // }
}
