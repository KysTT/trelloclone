import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@/entities/user.entity';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  protobufPackage,
  USER_PACKAGE_NAME,
  USER_SERVICE_NAME,
} from '@/interfaces/user';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthInterceptor } from '@/jwt.interceptor';

console.log(join(__dirname, './proto/user.proto'));
console.log(USER_SERVICE_NAME, protobufPackage, USER_PACKAGE_NAME);
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
    TypeOrmModule.forFeature([User]),
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
        name: USER_PACKAGE_NAME,
        transport: Transport.GRPC,
        options: {
          package: protobufPackage,
          protoPath: join(__dirname, './proto/user.proto'),
          url: `${process.env.GRPC_HOST}:${process.env.GRPC_PORT}`,
        },
      },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService, JwtAuthInterceptor],
})
export class AppModule {}
