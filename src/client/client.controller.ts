import { Roles } from 'src/auth/roles.decorator';
import { ClientService } from './client.service';
import { Body, Controller, Get } from '@nestjs/common';
import { User } from 'src/users/user.decorator';

@Controller('client')
export class ClientController {
    constructor(
        private readonly clientService: ClientService,
    ) { }
    
    async request(
        @User() user,
        @Body() clientRequestDto: ClientRequestDto
    ) {
        return this.clientService.createRequest(user, clientRequestDto);
    }
}
