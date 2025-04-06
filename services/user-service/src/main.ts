import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import {
  protobufPackage,
  USER_PACKAGE_NAME,
  USER_SERVICE_NAME,
} from '@/interfaces/user';

async function bootstrap() {
  console.log(join(__dirname, './proto/user.proto'));
  console.log(USER_SERVICE_NAME, protobufPackage, USER_PACKAGE_NAME);
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        package: protobufPackage,
        protoPath: join(__dirname, './proto/user.proto'),
        url: `${process.env.GRPC_HOST}:${process.env.GRPC_PORT}`,
      },
    },
  );
  await app.listen();
  console.log(
    `User microservice is listening on ${process.env.GRPC_HOST}:${process.env.GRPC_PORT}`,
  );
}
bootstrap();
