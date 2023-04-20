import { ExecutionContext, createParamDecorator } from "@nestjs/common";
import { User as U } from "@prisma/client";

export const User = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
      const request = ctx.switchToHttp().getRequest();
      return request.user;
    },
  );