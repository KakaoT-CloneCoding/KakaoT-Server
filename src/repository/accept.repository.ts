import { Injectable } from "@nestjs/common";
import { Request, User } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class AcceptRepository{
    constructor(
        private readonly prisma:PrismaService
    ) {
        
    }

    async isAcceptRequestId(request:Request) {
        return this.prisma.accept.findUnique({
            where: { 
                requestId:request.id
            }});
    }

    async create(user: User, request: Request) {
        console.log(user, request)
        return this.prisma.accept.create({
            data: {
                requestId: request.id,
                driverId: user.id,
            }
        })
    }
}