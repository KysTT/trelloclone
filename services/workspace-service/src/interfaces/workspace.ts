// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v2.7.0
//   protoc               v6.30.2
// source: src/proto/workspace.proto

/* eslint-disable */
import { Metadata } from "@grpc/grpc-js";
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "workspace";

export interface EmptyMessageRequest {
}

export interface FindByShortnameRequest {
  shortname: string;
}

export interface FindByBoardIdRequest {
  id: number;
}

export interface CreateWorkspaceRequest {
  name: string;
  shortname: string;
}

export interface EditWorkspaceRequest {
  id: number;
  name: string;
  shortname: string;
}

export interface WorkspacesResponse {
  workspaces: WorkspaceResponse[];
}

export interface WorkspaceResponse {
  id: number;
  name: string;
  shortname: string;
}

export interface WorkspacesWithBoardsResponse {
  workspaces: WorkspaceWithBoardsResponse[];
}

export interface WorkspaceWithBoardsResponse {
  id: number;
  name: string;
  shortname: string;
  boards: Board[];
}

export interface Board {
  id: number;
  name: string;
  visibility: string;
}

export const WORKSPACE_PACKAGE_NAME = "workspace";

export interface WorkspaceServiceClient {
  create(request: CreateWorkspaceRequest, metadata: Metadata, ...rest: any): Observable<WorkspaceResponse>;

  findByCurrUser(request: EmptyMessageRequest, metadata: Metadata, ...rest: any): Observable<WorkspacesResponse>;

  findByCurrUserFull(
    request: EmptyMessageRequest,
    metadata: Metadata,
    ...rest: any
  ): Observable<WorkspacesWithBoardsResponse>;

  edit(request: EditWorkspaceRequest, metadata: Metadata, ...rest: any): Observable<WorkspaceResponse>;

  findByShortname(request: FindByShortnameRequest, metadata: Metadata, ...rest: any): Observable<WorkspaceResponse>;

  findByBoardId(
    request: FindByBoardIdRequest,
    metadata: Metadata,
    ...rest: any
  ): Observable<WorkspaceWithBoardsResponse>;
}

export interface WorkspaceServiceController {
  create(
    request: CreateWorkspaceRequest,
    metadata: Metadata,
    ...rest: any
  ): Promise<WorkspaceResponse> | Observable<WorkspaceResponse> | WorkspaceResponse;

  findByCurrUser(
    request: EmptyMessageRequest,
    metadata: Metadata,
    ...rest: any
  ): Promise<WorkspacesResponse> | Observable<WorkspacesResponse> | WorkspacesResponse;

  findByCurrUserFull(
    request: EmptyMessageRequest,
    metadata: Metadata,
    ...rest: any
  ): Promise<WorkspacesWithBoardsResponse> | Observable<WorkspacesWithBoardsResponse> | WorkspacesWithBoardsResponse;

  edit(
    request: EditWorkspaceRequest,
    metadata: Metadata,
    ...rest: any
  ): Promise<WorkspaceResponse> | Observable<WorkspaceResponse> | WorkspaceResponse;

  findByShortname(
    request: FindByShortnameRequest,
    metadata: Metadata,
    ...rest: any
  ): Promise<WorkspaceResponse> | Observable<WorkspaceResponse> | WorkspaceResponse;

  findByBoardId(
    request: FindByBoardIdRequest,
    metadata: Metadata,
    ...rest: any
  ): Promise<WorkspaceWithBoardsResponse> | Observable<WorkspaceWithBoardsResponse> | WorkspaceWithBoardsResponse;
}

export function WorkspaceServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      "create",
      "findByCurrUser",
      "findByCurrUserFull",
      "edit",
      "findByShortname",
      "findByBoardId",
    ];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("WorkspaceService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("WorkspaceService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const WORKSPACE_SERVICE_NAME = "WorkspaceService";
