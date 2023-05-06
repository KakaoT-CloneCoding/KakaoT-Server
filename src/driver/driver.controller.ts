import { Controller, Param, Post } from '@nestjs/common';
import { DriverService } from './driver.service';
import { User } from 'src/users/user.decorator';

@Controller('driver')
export class DriverController {
    constructor(
        private readonly driverService:DriverService
    ) { }
    
    @Post(':orderId/accept')
    async accept(
        @User() user,
        @Param('orderId') orderId
    ) {
        return this.driverService.createAccept(user, orderId);
    }


}
