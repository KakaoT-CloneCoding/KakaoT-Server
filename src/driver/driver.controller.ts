import { Controller } from '@nestjs/common';
import { DriverService } from './driver.service';
import { User } from 'src/users/user.decorator';

@Controller('driver')
export class DriverController {
    constructor(
        private readonly driverService:DriverService
    ) { }
    
    async accept(
        
    ) {
        
    }


}
