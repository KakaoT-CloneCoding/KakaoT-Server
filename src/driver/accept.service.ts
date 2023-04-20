import { Injectable } from "@nestjs/common";
import { Roles } from "src/auth/roles.decorator";
import { PrismaService } from "src/prisma/prisma.service";


@Injectable()
@Roles('driver')
export class AcceptService{

    constructor(
      private readonly prisma:PrismaService,  
    ) { }
    
    async acceptUserRequest(orderId, ) {

    }
}