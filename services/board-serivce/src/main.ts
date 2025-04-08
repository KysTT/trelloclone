import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { protobufPackage } from '@/interfaces/board';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.GRPC,
    options: {
      package: protobufPackage,
      protoPath: join(__dirname, './proto/board.proto'),
      url: `${process.env.GRPC_HOST}:${process.env.GRPC_PORT}`,
    },
  });
  await app.listen();
  console.log(
    `Board microservice is listening on ${process.env.GRPC_HOST}:${process.env.GRPC_PORT}`,
  );
}
bootstrap();
