import { Controller, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GrpcMethod } from '@nestjs/microservices';
import {
  AUTH_SERVICE_NAME,
  AuthServiceController,
  AuthServiceControllerMethods,
  LoginRequest,
  LoginResponse,
  ValidateTokenRequest,
  ValidateTokenResponse,
} from '@/interfaces/auth';
import { JwtAuthInterceptor } from '@/jwt.interceptor';

@Controller('api/auth')
@AuthServiceControllerMethods()
export class AuthController implements AuthServiceController {
  constructor(private readonly authService: AuthService) {}

  @GrpcMethod(AUTH_SERVICE_NAME, 'login')
  async login(data: LoginRequest): Promise<LoginResponse> {
    return this.authService.login(data);
  }

  @UseInterceptors(JwtAuthInterceptor)
  @GrpcMethod(AUTH_SERVICE_NAME, 'validateToken')
  validateToken(data: ValidateTokenRequest): ValidateTokenResponse {
    return data['user'];
  }
}
