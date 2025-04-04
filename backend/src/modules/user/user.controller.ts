import { UserService } from '@modules/user/user.service';
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreateUserDto } from '@modules/user/dto/create-user.dto';
import { JwtAuthGuard } from '@modules/auth/jwt-auth.guard';
import { DrawUserDto } from '@modules/user/dto/draw-user.dto';
import { UserRequest } from '@/common/user-request.decorator';
import { User } from '@modules/datasource/entities/user.entity';

@Controller('api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body() data: CreateUserDto): Promise<DrawUserDto> {
    return await this.userService.createUser(data);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async me(@UserRequest() user: User): Promise<DrawUserDto> {
    return await this.userService.findOneDto(user.email);
  }
}
