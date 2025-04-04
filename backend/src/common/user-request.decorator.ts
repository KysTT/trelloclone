import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { User } from '@modules/datasource/entities/user.entity';

export interface UserRequest extends Request {
  user: User;
}

export const UserRequest = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest<UserRequest>();
    return req.user;
  },
);
