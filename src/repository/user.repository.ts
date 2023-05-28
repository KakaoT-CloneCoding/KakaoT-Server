import { UserUpdateRequestDto } from './../users/dtos/user.update.dto';
import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserInfo } from 'src/users/dtos/user.login.dto';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}
  async getUserByEmail(email: string) {
    return (
      this.prisma.user.findUnique({
        where: { email },
      }) ?? null
    );
  }
  async getUserOrError() {}
  async registerOrLogin() {}
  async register(data: UserInfo) {
    console.log('test1');
    return this.prisma.user.upsert({
      where: {
        email: data.email,
      },
      update: { ...data },
      create: { ...data },
    });
  }

  async getUserById(id: number) {
    return this.prisma.user.findFirst({
      where: { id: +id },
    });
  }
  async update(user, userUpdateRequestDto) {
    return this.prisma.user.update({
      where: { id: +user.id },
      data: {
        ...userUpdateRequestDto,
      },
    });
  }
}
