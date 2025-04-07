import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import {
  CreateUserRequest,
  CreateUserResponse,
  FindByEmailRequest,
  FindUserFullResponse,
  FindUserResponse,
  USER_PACKAGE_NAME,
  USER_SERVICE_NAME,
  UserServiceClient,
} from '@/interfaces/user';

@Injectable()
export class UserService implements OnModuleInit {
  private userService: UserServiceClient;

  @InjectRepository(User)
  private readonly userRepository: Repository<User>;

  constructor(
    @Inject(USER_PACKAGE_NAME) private client: ClientGrpc,
    private configService: ConfigService,
  ) {}

  onModuleInit() {
    this.userService =
      this.client.getService<UserServiceClient>(USER_SERVICE_NAME);
  }

  async register(data: CreateUserRequest): Promise<CreateUserResponse> {
    return await this.userRepository.save({
      name: data.name,
      username: data.username,
      email: data.email,
      password: await bcrypt.hash(data.password, 10),
    });
  }

  async findUserByEmail(
    data: FindByEmailRequest,
  ): Promise<FindUserResponse | null> {
    return await this.userRepository.findOne({
      where: { email: data.email },
    });
  }

  async findUserByEmailFull(
    data: FindByEmailRequest,
  ): Promise<FindUserFullResponse | null> {
    return await this.userRepository.findOne({
      where: { email: data.email },
      relations: ['workspaces', 'attached_cards', 'boards_member'],
    });
  }
}
