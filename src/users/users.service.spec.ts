import { Test } from '@nestjs/testing';
import { UsersService } from './users.service';
import { User } from '@prisma/client';

describe('UserService', () => {
  let service: UsersService;

  beforeAll(async () => {
    const modules = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();
    service = modules.get<UsersService>(UsersService);
  });

  it.todo('getMe', async () => {
    // describe()
  });

  it.todo('kakao_login');
  it.todo('testLogin');
  it.todo('getKakaoAccessToken');
});
