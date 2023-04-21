import { Injectable } from "@nestjs/common";
import { User } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { UserInfo } from "src/users/dtos/user.login.dto";


@Injectable()
export class UserRepository {

    constructor(
        private readonly prisma:PrismaService
    ) {
       
    }
    async getUserByEmail(email:string) {
        return this.prisma.user.findUnique({
            where: { email }
        }) ?? null;
    }
    async getUserOrError() { }
    async registerOrLogin() { }
    async register(data: UserInfo) {
        return this.prisma.user.upsert({
            where: {
                email: data.email
            },
            update: { ...data },
            create: { ...data },
        });
    }

}