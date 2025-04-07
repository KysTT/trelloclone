import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import { Transport } from '@nestjs/microservices';
import { protobufPackage } from '@/interfaces/workspace';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.GRPC,
    options: {
      package: protobufPackage,
      protoPath: join(__dirname, './proto/workspace.proto'),
      url: `${process.env.GRPC_HOST}:${process.env.GRPC_PORT}`,
    },
  });
  await app.listen();
  console.log(
    `Workspace microservice is listening on ${process.env.GRPC_HOST}:${process.env.GRPC_PORT}`,
  );
}
bootstrap();
