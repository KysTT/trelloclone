import { User } from '@modules/datasource/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '@modules/user/dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { DrawUserDto } from '@modules/user/dto/draw-user.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UserService {
  @InjectRepository(User)
  private readonly userRepository: Repository<User>;

  async findOne(email: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: {
        email: email,
      },
    });
    if (!user) {
      throw new UnauthorizedException('Invalid Credentials');
    }
    return user;
  }

  async findOneDto(email: string): Promise<DrawUserDto> {
    const user = await this.userRepository.findOne({
      where: {
        email: email,
      },
    });
    if (!user) {
      throw new UnauthorizedException('Invalid Credentials');
    }
    return plainToInstance(DrawUserDto, user, {
      excludeExtraneousValues: true,
    });
  }

  async findOneById(id: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id: id },
      relations: {
        workspaces: true,
        attached_cards: true,
        boards_member: true,
      },
    });
    if (!user) {
      throw new UnauthorizedException('Invalid Credentials');
    }
    return user;
  }

  async findOneByIdDto(id: number): Promise<DrawUserDto> {
    const user = await this.userRepository.findOne({
      where: { id: id },
      relations: {
        workspaces: true,
        attached_cards: true,
        boards_member: true,
      },
    });
    if (!user) {
      throw new UnauthorizedException('Invalid Credentials');
    }
    return plainToInstance(DrawUserDto, user, {
      excludeExtraneousValues: true,
    });
  }

  async createUser(user: CreateUserDto): Promise<User> {
    return await this.userRepository.save({
      email: user.email,
      name: user.name,
      username: user.username,
      password: await bcrypt.hash(user.password, 10),
    });
  }
}
