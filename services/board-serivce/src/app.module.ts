import { Module } from '@nestjs/common';
import { BoardController } from './board.controller';
import { BoardService } from './board.service';
import { join } from 'path';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from '@/entities/user.entity';
import { Workspace } from '@/entities/workspace.entity';
import { Board } from '@/entities/board.entity';
import { JwtModule } from '@nestjs/jwt';
import { Category } from '@/entities/category.entity';
import { JwtAuthInterceptor } from '@/jwt.interceptor';
import { BOARD_PACKAGE_NAME, protobufPackage } from '@/interfaces/board';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('PG_HOST'),
        port: configService.get<number>('PG_PORT'),
        username: configService.get<string>('PG_USER'),
        password: configService.get<string>('PG_PASSWORD'),
        database: configService.get<string>('PG_DATABASE'),
        entities: [`${__dirname}/entities/*.entity.{ts,js}`],
        synchronize: true,
        // migrations: [`${__dirname}/../migrations/*.{ts,js}`],
        // migrationsTableName: 'migrations',
        // logging: 'all',
        // migrationsRun: true,
      }),
    }),
    TypeOrmModule.forFeature([User, Workspace, Board, Category]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get<string>('JWT_EXPIRES_IN'), // JWT_EXPIRES_IN should look like 1d, 1w etc.
        },
      }),
    }),
    ClientsModule.register([
      {
        name: BOARD_PACKAGE_NAME,
        transport: Transport.GRPC,
        options: {
          package: protobufPackage,
          protoPath: join(__dirname, './proto/board.proto'),
          url: `${process.env.GRPC_HOST}:${process.env.GRPC_PORT}`,
        },
      },
    ]),
  ],
  controllers: [BoardController],
  providers: [BoardService, JwtAuthInterceptor],
})
export class AppModule {}
