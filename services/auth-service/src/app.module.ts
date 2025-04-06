import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@/entities/user.entity';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AUTH_PACKAGE_NAME, protobufPackage } from '@/interfaces/auth';
import { join } from 'path';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from '@/jwt.strategy';
import { JwtAuthInterceptor } from '@/jwt.interceptor';

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
        name: AUTH_PACKAGE_NAME,
        transport: Transport.GRPC,
        options: {
          package: protobufPackage,
          protoPath: join(__dirname, './proto/auth.proto'),
          url: `${process.env.GRPC_HOST}:${process.env.GRPC_PORT}`,
        },
      },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, JwtAuthInterceptor],
})
export class AppModule {}
