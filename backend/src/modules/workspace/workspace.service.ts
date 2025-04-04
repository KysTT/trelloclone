import { Workspace } from '@modules/datasource/entities/workspace.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from '@modules/user/user.service';
import { CommonWorkspaceDto } from '@modules/workspace/dto/common-workspace.dto';
import { User } from '../datasource/entities/user.entity';
import { plainToClass, plainToInstance } from 'class-transformer';
import {
  DrawWorkspaceDTO,
  DrawWorkspaceDTONoBoards,
} from '@modules/workspace/dto/draw-workspace.dto';
import { BoardsService } from '@modules/board/boards.service';
import { CreateWorkspaceDto } from '@modules/workspace/dto/create-workspace.dto';

@Injectable()
export class WorkspaceService {
  @InjectRepository(Workspace)
  private readonly workspaceRepository: Repository<Workspace>;
  @InjectRepository(User)
  private readonly userRepository: Repository<User>;

  constructor(
    private boardsService: BoardsService,
    private userService: UserService,
  ) {}

  async create(data: CreateWorkspaceDto): Promise<DrawWorkspaceDTO> {
    const { name, shortname, user } = data;
    const workspace = await this.workspaceRepository.save({
      name,
      shortname,
      users: [user],
    });

    return plainToClass(DrawWorkspaceDTO, workspace, {
      excludeExtraneousValues: true,
    });
  }

  async findById(id: number): Promise<Workspace> {
    const workspace = await this.workspaceRepository.findOne({
      where: { id: id },
      relations: ['boards'],
    });
    if (!workspace) throw new NotFoundException();
    return workspace;
  }

  async findByIdDto(id: number): Promise<DrawWorkspaceDTO> {
    const workspace = await this.workspaceRepository.findOne({
      where: { id: id },
      relations: ['boards'],
    });
    if (!workspace) throw new NotFoundException();
    return plainToInstance(DrawWorkspaceDTO, workspace, {
      excludeExtraneousValues: true,
    });
  }

  async findByBoardId(id: number): Promise<DrawWorkspaceDTO> {
    const board = await this.boardsService.findById(id);
    const workspace = await this.workspaceRepository.findOne({
      where: { id: board.workspace.id },
      relations: ['boards'],
    });
    if (!workspace) throw new NotFoundException();
    return plainToInstance(DrawWorkspaceDTO, workspace, {
      excludeExtraneousValues: true,
    });
  }

  async editWorkspace(data: CommonWorkspaceDto): Promise<Workspace> {
    const workspaceToUpdate = await this.workspaceRepository.findOneBy({
      id: data.id,
    });
    if (!workspaceToUpdate) throw new NotFoundException('Workspace not found');
    workspaceToUpdate.name = data.name;
    workspaceToUpdate.shortname = data.shortname;
    return await this.workspaceRepository.save(workspaceToUpdate);
  }

  async findAllByUser(id: number): Promise<DrawWorkspaceDTONoBoards[]> {
    const user = await this.userService.findOneById(id);
    return plainToInstance(DrawWorkspaceDTONoBoards, user.workspaces, {
      excludeExtraneousValues: true,
    });
  }

  async findByShortname(shortname: string): Promise<DrawWorkspaceDTONoBoards> {
    const workspace = await this.workspaceRepository.findOne({
      where: {
        shortname: shortname,
      },
      relations: ['boards'],
    });

    if (!workspace) {
      throw new NotFoundException("Workspace doesn't exist");
    }

    return plainToInstance(DrawWorkspaceDTONoBoards, workspace, {
      excludeExtraneousValues: true,
    });
  }
}
