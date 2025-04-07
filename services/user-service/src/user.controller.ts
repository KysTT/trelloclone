import { Controller, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { GrpcMethod, RpcException } from '@nestjs/microservices';
import {
  CreateUserRequest,
  CreateUserResponse,
  FindByEmailRequest,
  FindMeRequest,
  FindUserFullResponse,
  FindUserResponse,
  USER_SERVICE_NAME,
  UserServiceController,
  UserServiceControllerMethods,
} from '@/interfaces/user';
import { JwtAuthInterceptor } from '@/jwt.interceptor';

@Controller('api/user')
@UserServiceControllerMethods()
export class UserController implements UserServiceController {
  constructor(private readonly userService: UserService) {}

  @GrpcMethod(USER_SERVICE_NAME, 'register')
  async register(data: CreateUserRequest): Promise<CreateUserResponse> {
    return this.userService.register(data);
  }

  @UseInterceptors(JwtAuthInterceptor)
  @GrpcMethod(USER_SERVICE_NAME, 'findUserByEmail')
  async findUserByEmail(data: FindByEmailRequest): Promise<FindUserResponse> {
    const user = await this.userService.findUserByEmail(data);
    if (!user) {
      throw new RpcException('User does not exist');
    }
    return user;
  }

  @UseInterceptors(JwtAuthInterceptor)
  @GrpcMethod(USER_SERVICE_NAME, 'findUserByEmailFull')
  async findUserByEmailFull(
    data: FindByEmailRequest,
  ): Promise<FindUserFullResponse> {
    const user = await this.userService.findUserByEmailFull(data);
    if (!user) {
      throw new RpcException('User does not exist');
    }
    return user;
  }

  @UseInterceptors(JwtAuthInterceptor)
  @GrpcMethod(USER_SERVICE_NAME, 'findMe')
  findMe(data: FindMeRequest): Promise<FindUserResponse> {
    if (!data['user']) {
      throw new RpcException('Something went wrong');
    }
    return data['user'];
  }

  @UseInterceptors(JwtAuthInterceptor)
  @GrpcMethod(USER_SERVICE_NAME, 'findMeFull')
  async findMeFull(data: FindMeRequest): Promise<FindUserFullResponse> {
    if (!data['user']) {
      throw new RpcException('Something went wrong');
    }
    const user = await this.userService.findUserByEmailFull(data['user'].email);
    if (!user) {
      throw new RpcException('User does not exist');
    }
    return user;
  }
}
