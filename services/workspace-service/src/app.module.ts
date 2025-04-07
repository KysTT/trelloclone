import { Module } from '@nestjs/common';
import { WorkspaceController } from './workspace.controller';
import { WorkspaceService } from './workspace.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@/entities/user.entity';
import { Workspace } from '@/entities/workspace.entity';
import { Board } from '@/entities/board.entity';
import { JwtModule } from '@nestjs/jwt';
import { join } from 'path';
import { ClientsModule, Transport } from '@nestjs/microservices';
import {
  protobufPackage,
  WORKSPACE_PACKAGE_NAME,
} from '@/interfaces/workspace';

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
    TypeOrmModule.forFeature([User, Workspace, Board]),
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
        name: WORKSPACE_PACKAGE_NAME,
        transport: Transport.GRPC,
        options: {
          package: protobufPackage,
          protoPath: join(__dirname, './proto/workspace.proto'),
          url: `${process.env.GRPC_HOST}:${process.env.GRPC_PORT}`,
        },
      },
    ]),
  ],
  controllers: [WorkspaceController],
  providers: [WorkspaceService],
})
export class AppModule {}
