// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v2.7.0
//   protoc               v6.30.2
// source: src/proto/user.proto

/* eslint-disable */
import { Metadata } from '@grpc/grpc-js';
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import { Observable } from 'rxjs';

export const protobufPackage = 'user';

export enum VisibilityEnum {
  public = 0,
  workspace = 1,
  private = 2,
  UNRECOGNIZED = -1,
}

export interface CreateUserRequest {
  name: string;
  username: string;
  email: string;
  password: string;
}

export interface CreateUserResponse {
  name: string;
  username: string;
  email: string;
  password: string;
}

export interface FindMeRequest {}

export interface FindByEmailRequest {
  email: string;
}

export interface FindByIdRequest {
  id: number;
}

export interface FindUserResponse {
  id: number;
  name: string;
  username: string;
  email: string;
}

export interface FindUserFullResponse {
  id: number;
  name: string;
  username: string;
  email: string;
  workspaces: Workspace[];
  boards_member: Board[];
  attached_cards: Card[];
}

export interface Workspace {
  id: number;
  name: string;
  shortname: string;
  boards: Board[];
}

export interface Board {
  id: number;
  name: string;
  visibility: VisibilityEnum;
}

export interface Card {
  id: number;
  name: string;
  description: string;
}

export const USER_PACKAGE_NAME = 'user';

export interface UserServiceClient {
  register(
    request: CreateUserRequest,
    metadata: Metadata,
    ...rest: any
  ): Observable<CreateUserResponse>;

  findUserByEmail(
    request: FindByEmailRequest,
    metadata: Metadata,
    ...rest: any
  ): Observable<FindUserResponse>;

  findUserByEmailFull(
    request: FindByEmailRequest,
    metadata: Metadata,
    ...rest: any
  ): Observable<FindUserFullResponse>;

  findMe(
    request: FindMeRequest,
    metadata: Metadata,
    ...rest: any
  ): Observable<FindUserResponse>;

  findMeFull(
    request: FindMeRequest,
    metadata: Metadata,
    ...rest: any
  ): Observable<FindUserFullResponse>;
}

export interface UserServiceController {
  register(
    request: CreateUserRequest,
    metadata: Metadata,
    ...rest: any
  ):
    | Promise<CreateUserResponse>
    | Observable<CreateUserResponse>
    | CreateUserResponse;

  findUserByEmail(
    request: FindByEmailRequest,
    metadata: Metadata,
    ...rest: any
  ):
    | Promise<FindUserResponse>
    | Observable<FindUserResponse>
    | FindUserResponse;

  findUserByEmailFull(
    request: FindByEmailRequest,
    metadata: Metadata,
    ...rest: any
  ):
    | Promise<FindUserFullResponse>
    | Observable<FindUserFullResponse>
    | FindUserFullResponse;

  findMe(
    request: FindMeRequest,
    metadata: Metadata,
    ...rest: any
  ):
    | Promise<FindUserResponse>
    | Observable<FindUserResponse>
    | FindUserResponse;

  findMeFull(
    request: FindMeRequest,
    metadata: Metadata,
    ...rest: any
  ):
    | Promise<FindUserFullResponse>
    | Observable<FindUserFullResponse>
    | FindUserFullResponse;
}

export function UserServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      'register',
      'findUserByEmail',
      'findUserByEmailFull',
      'findMe',
      'findMeFull',
    ];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcMethod('UserService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcStreamMethod('UserService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
  };
}

export const USER_SERVICE_NAME = 'UserService';
