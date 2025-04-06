import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { protobufPackage } from '@/interfaces/auth';

async function bootstrap() {
  console.log(join(__dirname, './proto/auth.proto'));
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        package: protobufPackage,
        protoPath: join(__dirname, './proto/auth.proto'),
        url: `${process.env.GRPC_HOST}:${process.env.GRPC_PORT}`,
      },
    },
  );
  await app.listen();
  console.log(
    `Auth microservice is listening on ${process.env.GRPC_HOST}:${process.env.GRPC_PORT}`,
  );
}
bootstrap();
