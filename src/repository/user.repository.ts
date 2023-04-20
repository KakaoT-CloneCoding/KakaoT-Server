import { Injectable } from "@nestjs/common";
import { User } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { UserInfo } from "src/users/dtos/user.login.dto";


@Injectable()
export class UserRepository {
    private readonly user;

    constructor(
        private readonly prisma:PrismaService
    ) {
        this.user = this.prisma.user;
    }
    async getUserByEmail(email:string) {
        return this.user.findUnique({
            where: { email }
        }) ?? null;
    }
    async getUserOrError() { }
    async registerOrLogin() { }
    async register(data: UserInfo) {
        return this.user.upsert({
            where: {
                email: data.email
            },
            update: { ...data },
            create: { ...data },
        });
    }

}