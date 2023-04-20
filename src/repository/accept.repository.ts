import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class AcceptRepository{
    private readonly accept;
    constructor(
        private readonly prisma:PrismaService
    ) {
        this.accept = this.prisma.accept;
    }
}