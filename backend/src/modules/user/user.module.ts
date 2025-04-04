import { Module } from '@nestjs/common';
import { UserService } from '@modules/user/user.service';
import { UserController } from '@modules/user/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@modules/datasource/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
