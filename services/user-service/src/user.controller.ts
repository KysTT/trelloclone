import { Controller, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { GrpcMethod, RpcException } from '@nestjs/microservices';
import {
  CreateUserRequest,
  CreateUserResponse,
  FindByEmailRequest,
  FindByEmailResponse,
  FindByIdRequest,
  FindByIdResponse,
  protobufPackage,
  USER_PACKAGE_NAME,
  USER_SERVICE_NAME,
  UserServiceController,
  UserServiceControllerMethods,
} from '@/interfaces/user';
import { join } from 'path';
import { JwtAuthInterceptor } from '@/jwt.interceptor';

console.log(join(__dirname, './proto/user.proto'));
console.log(USER_SERVICE_NAME, protobufPackage, USER_PACKAGE_NAME);
@Controller('api/user')
@UserServiceControllerMethods()
export class UserController implements UserServiceController {
  constructor(private readonly userService: UserService) {}

  @GrpcMethod(USER_SERVICE_NAME, 'register')
  async register(data: CreateUserRequest): Promise<CreateUserResponse> {
    return this.userService.register(data);
  }

  @UseInterceptors(JwtAuthInterceptor)
  @GrpcMethod(USER_SERVICE_NAME, 'findOneByEmail')
  async findOneByEmail(data: FindByEmailRequest): Promise<FindByEmailResponse> {
    const user = await this.userService.findOneByEmail(data);
    if (!user) {
      throw new RpcException('User does not exist');
    }
    return user;
  }

  @UseInterceptors(JwtAuthInterceptor)
  @GrpcMethod(USER_SERVICE_NAME, 'findOneById')
  async findOneById(data: FindByIdRequest): Promise<FindByIdResponse> {
    const user = await this.userService.findOneById(data);
    if (!user) {
      throw new RpcException('User does not exist');
    }
    return user;
  }
}
