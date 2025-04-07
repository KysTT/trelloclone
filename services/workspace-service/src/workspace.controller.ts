import { Controller, UseInterceptors } from '@nestjs/common';
import { WorkspaceService } from './workspace.service';
import {
  CreateWorkspaceRequest,
  EditWorkspaceRequest,
  EmptyMessageRequest,
  FindByBoardIdRequest,
  FindByShortnameRequest,
  WORKSPACE_SERVICE_NAME,
  WorkspaceResponse,
  WorkspaceServiceController,
  WorkspacesResponse,
  WorkspacesWithBoardsResponse,
  WorkspaceWithBoardsResponse,
} from '@/interfaces/workspace';
import { JwtAuthInterceptor } from '@/jwt.interceptor';
import { GrpcMethod } from '@nestjs/microservices';

@Controller('api/workspace')
export class WorkspaceController implements WorkspaceServiceController {
  constructor(private readonly workspaceService: WorkspaceService) {}

  @UseInterceptors(JwtAuthInterceptor)
  @GrpcMethod(WORKSPACE_SERVICE_NAME, 'create')
  async create(data: CreateWorkspaceRequest): Promise<WorkspaceResponse> {
    return await this.workspaceService.create(data, data['user']);
  }

  @UseInterceptors(JwtAuthInterceptor)
  @GrpcMethod(WORKSPACE_SERVICE_NAME, 'edit')
  async edit(data: EditWorkspaceRequest): Promise<WorkspaceResponse> {
    return await this.workspaceService.edit(data);
  }

  @UseInterceptors(JwtAuthInterceptor)
  @GrpcMethod(WORKSPACE_SERVICE_NAME, 'findByCurrUser')
  async findByCurrUser(data: EmptyMessageRequest): Promise<WorkspacesResponse> {
    return await this.workspaceService.findByCurrUser(data['user']);
  }

  @UseInterceptors(JwtAuthInterceptor)
  @GrpcMethod(WORKSPACE_SERVICE_NAME, 'findByCurrUserFull')
  async findByCurrUserFull(
    data: EmptyMessageRequest,
  ): Promise<WorkspacesWithBoardsResponse> {
    return await this.workspaceService.findByCurrUserFull(data['user']);
  }

  @GrpcMethod(WORKSPACE_SERVICE_NAME, 'findByBoardId')
  async findByBoardId(
    data: FindByBoardIdRequest,
  ): Promise<WorkspaceWithBoardsResponse> {
    return this.workspaceService.findByBoardId(data);
  }

  @UseInterceptors(JwtAuthInterceptor)
  @GrpcMethod(WORKSPACE_SERVICE_NAME, 'findByShortname')
  async findByShortname(
    data: FindByShortnameRequest,
  ): Promise<WorkspaceResponse> {
    return await this.workspaceService.findByShortname(data);
  }
}
