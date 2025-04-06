import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Metadata } from '@grpc/grpc-js';
import { extractTokenFromGrpcMetadata } from '@/misc/extractTokenFromGrpcMetadata';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class JwtAuthInterceptor implements NestInterceptor {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const rpcContext = context.switchToRpc();
    const metadata = context.switchToRpc().getContext<Metadata>();

    const token = extractTokenFromGrpcMetadata(metadata);

    if (!token) {
      throw new RpcException('No token provided');
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get<string>('JWT_SECRET'),
      });
      rpcContext.getData().user = { id: payload.sub, email: payload.email };
      return next.handle();
    } catch (error) {
      throw new RpcException('Invalid token');
    }
  }
}
