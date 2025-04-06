import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc, RpcException } from '@nestjs/microservices';
import {
  AUTH_PACKAGE_NAME,
  AUTH_SERVICE_NAME,
  AuthServiceClient,
  LoginRequest,
  LoginResponse,
} from '@/interfaces/auth';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService implements OnModuleInit {
  private authService: AuthServiceClient;

  @InjectRepository(User)
  private readonly userRepository: Repository<User>;

  constructor(
    private readonly jwtService: JwtService,
    @Inject(AUTH_PACKAGE_NAME) private client: ClientGrpc,
    private configService: ConfigService,
  ) {}

  onModuleInit() {
    this.authService =
      this.client.getService<AuthServiceClient>(AUTH_SERVICE_NAME);
  }

  async login(data: LoginRequest): Promise<LoginResponse> {
    const user = await this.userRepository.findOneBy({
      email: data.email,
    });

    if (!user || !(await bcrypt.compare(data.password, user.password))) {
      throw new RpcException('Invalid credentials');
    }
    const payload = { email: user.email, sub: user.id };
    const token = this.jwtService.sign(payload);
    return { accessToken: token };
  }
}
