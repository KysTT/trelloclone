import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import {
  CreateWorkspaceRequest,
  EditWorkspaceRequest,
  FindByBoardIdRequest,
  FindByShortnameRequest,
  WORKSPACE_PACKAGE_NAME,
  WORKSPACE_SERVICE_NAME,
  WorkspaceResponse,
  WorkspaceServiceClient,
  WorkspacesResponse,
  WorkspacesWithBoardsResponse,
  WorkspaceWithBoardsResponse,
} from '@/interfaces/workspace';
import { ClientGrpc, RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Workspace } from '@/entities/workspace.entity';
import { Repository } from 'typeorm';
import { User } from '@/entities/user.entity';
import { Board } from '@/entities/board.entity';
import { plainToInstance } from 'class-transformer';
import {
  DrawWorkspaceDTO,
  DrawWorkspaceDTONoBoards,
} from '@/dto/draw-workspace.dto';

@Injectable()
export class WorkspaceService implements OnModuleInit {
  private workspaceService: WorkspaceServiceClient;

  @InjectRepository(Workspace)
  private readonly workspaceRepository: Repository<Workspace>;
  @InjectRepository(User)
  private readonly userRepository: Repository<User>;
  @InjectRepository(Board)
  private readonly boardRepository: Repository<Board>;

  constructor(@Inject(WORKSPACE_PACKAGE_NAME) private client: ClientGrpc) {}

  onModuleInit() {
    this.workspaceService = this.client.getService<WorkspaceServiceClient>(
      WORKSPACE_SERVICE_NAME,
    );
  }

  async create(data: CreateWorkspaceRequest, user): Promise<WorkspaceResponse> {
    const { name, shortname } = data;
    const workspace = await this.workspaceRepository.save({
      name,
      shortname,
      users: [user],
    });
    return plainToInstance(DrawWorkspaceDTONoBoards, workspace, {
      excludeExtraneousValues: true,
    });
  }

  async edit(data: EditWorkspaceRequest): Promise<WorkspaceResponse> {
    const workspaceToUpdate = await this.workspaceRepository.findOneBy({
      id: data.id,
    });
    if (!workspaceToUpdate) throw new RpcException('Workspace not found');
    workspaceToUpdate.name = data.name;
    workspaceToUpdate.shortname = data.shortname;
    return await this.workspaceRepository.save(workspaceToUpdate);
  }

  async findByCurrUser(data): Promise<WorkspacesResponse> {
    const user = await this.userRepository.findOne({
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment
      where: { id: data.id },
      relations: ['workspaces'],
    });
    const workspaces = plainToInstance(
      DrawWorkspaceDTONoBoards,
      // @ts-ignore
      user.workspaces,
      { excludeExtraneousValues: true },
    );
    return { workspaces: workspaces };
  }

  async findByCurrUserFull(data): Promise<WorkspacesWithBoardsResponse> {
    const user = await this.userRepository.findOne({
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment
      where: { id: data.id },
      relations: ['workspaces'],
    });
    // @ts-ignore
    return { workspaces: user.workspaces };
  }

  async findByBoardId(
    data: FindByBoardIdRequest,
  ): Promise<WorkspaceWithBoardsResponse> {
    const board = await this.boardRepository.findOne({
      where: { id: data.id },
    });
    if (!board) throw new RpcException('Board not found');
    const workspace = await this.workspaceRepository.findOne({
      where: { id: board.workspace.id },
      relations: ['boards'],
    });
    return plainToInstance(DrawWorkspaceDTO, workspace, {
      excludeExtraneousValues: true,
    });
  }

  async findByShortname(
    data: FindByShortnameRequest,
  ): Promise<WorkspaceResponse> {
    const workspace = await this.workspaceRepository.findOne({
      where: {
        shortname: data.shortname,
      },
      relations: ['boards'],
    });
    if (!workspace) {
      throw new RpcException("Workspace doesn't exist");
    }
    return plainToInstance(DrawWorkspaceDTONoBoards, workspace, {
      excludeExtraneousValues: true,
    });
  }
}
