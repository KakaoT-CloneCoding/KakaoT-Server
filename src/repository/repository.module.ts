import { Global, Module } from "@nestjs/common";
import { UserRepository } from "./user.repository";
import { RequestRepository } from "./request.repository";
import { AcceptRepository } from "./accept.repository";
import { PrismaModule } from "src/prisma/prisma.module";

@Global()
@Module({
    imports: [PrismaModule],
    providers: [UserRepository, RequestRepository,AcceptRepository],
    exports:[UserRepository, RequestRepository,AcceptRepository],
})
export class RepositoryModule {}