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
  FindByEmailResponse,
  FindByIdRequest,
  FindByIdResponse,
  USER_PACKAGE_NAME,
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
      this.client.getService<UserServiceClient>(USER_PACKAGE_NAME);
  }

  async register(data: CreateUserRequest): Promise<CreateUserResponse> {
    return await this.userRepository.save({
      name: data.name,
      username: data.username,
      email: data.email,
      password: await bcrypt.hash(data.password, 10),
    });
  }

  async findOneByEmail(
    data: FindByEmailRequest,
  ): Promise<FindByEmailResponse | null> {
    return await this.userRepository.findOne({
      where: { email: data.email },
    });
  }

  async findOneById(data: FindByIdRequest): Promise<FindByIdResponse | null> {
    return await this.userRepository.findOne({
      where: { id: data.id },
      relations: ['workspaces', 'boards_member', 'attached_cards'],
    });
  }
}
