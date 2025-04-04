import { Module } from '@nestjs/common';
import { UserModule } from '@modules/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '@modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { WorkspaceModule } from '@modules/workspace/workspace.module';
import { BoardsModule } from '@modules/board/boards.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'root',
      password: 'root',
      database: 'trelloclone',
      synchronize: true,
      entities: [`${__dirname}/datasource/entities/**.entity{.ts,.js}`],
    }),
    UserModule,
    AuthModule,
    WorkspaceModule,
    BoardsModule,
  ],
})
export class AppModule {}
