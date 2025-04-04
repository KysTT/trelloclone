import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '@modules/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from '@modules/auth/dto/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(data: LoginDto) {
    const user = await this.userService.findOne(data.email);
    if (await bcrypt.compare(data.password, user.password))
      return this.jwtService.sign({
        id: user.id,
        email: user.email,
      });
    else throw new UnauthorizedException('Invalid Credentials');
  }
}
