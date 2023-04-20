import { Injectable } from "@nestjs/common";


@Injectable()
export class UserRepository {
    async getUser() { }
    async getUserOrError() { }
    async registerOrLogin() { }
    async register() {}
}