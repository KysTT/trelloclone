import { Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { extractTokenFromGrpcMetadata } from '@/misc/extractTokenFromGrpcMetadata';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: extractTokenFromGrpcMetadata,
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET')!,
    });
  }
  validate(payload: any) {
    console.log(payload);
    return { id: payload.sub, email: payload.email };
  }
}
