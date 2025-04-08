import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import {
  BOARD_PACKAGE_NAME,
  BOARD_SERVICE_NAME,
  BoardServiceClient,
  CreateBoardRequest,
  DrawBoardResponse,
  DrawBoardsResponse,
  FindByIdRequest,
} from '@/interfaces/board';
import { ClientGrpc, RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Workspace } from '@/entities/workspace.entity';
import { Repository } from 'typeorm';
import { User } from '@/entities/user.entity';
import { Board } from '@/entities/board.entity';
import { Category } from '@/entities/category.entity';
import { plainToInstance } from 'class-transformer';
import { DrawBoardDto } from '@/dto/draw-board.dto';

@Injectable()
export class BoardService implements OnModuleInit {
  private boardService: BoardServiceClient;

  @InjectRepository(Workspace)
  private workspaceRepository: Repository<Workspace>;
  @InjectRepository(User)
  private userRepository: Repository<User>;
  @InjectRepository(Board)
  private boardRepository: Repository<Board>;
  @InjectRepository(Category)
  private categoryRepository: Repository<Category>;

  constructor(@Inject(BOARD_PACKAGE_NAME) private client: ClientGrpc) {}

  onModuleInit(): any {
    this.boardService =
      this.client.getService<BoardServiceClient>(BOARD_SERVICE_NAME);
  }

  async create(data: CreateBoardRequest): Promise<DrawBoardResponse> {
    const { name, visibility } = data;
    const workspace = await this.workspaceRepository.findOne({
      where: { id: data.workspace_id },
      relations: ['boards'],
    });
    if (!workspace) {
      throw new RpcException('Failed to create board');
    }
    const user = data['user'];
    if (!user) {
      throw new RpcException('Failed to create board');
    }
    const categoryIP = this.categoryRepository.create({
      name: 'In progress',
    });
    const categoryTD = this.categoryRepository.create({
      name: 'To do',
    });
    const categoryDone = this.categoryRepository.create({
      name: 'Done',
    });
    try {
      const board = await this.boardRepository.save({
        name,
        workspace,
        categories: [categoryIP, categoryTD, categoryDone],
        members: [user],
        visibility: visibility,
      });
      categoryIP.board = board;
      categoryTD.board = board;
      categoryDone.board = board;
      await this.categoryRepository.save([
        categoryIP,
        categoryTD,
        categoryDone,
      ]);
      // @ts-ignore
      return plainToInstance(DrawBoardDto, board, {
        excludeExtraneousValues: true,
      });
    } catch (err) {
      throw new RpcException('Failed to create board');
    }
  }

  async findById(data: FindByIdRequest): Promise<DrawBoardResponse> {
    const board = await this.boardRepository.findOne({
      where: { id: data.id },
      relations: ['categories'],
    });
    if (!board) throw new RpcException('Cannot find board');
    return board;
  }

  async findByUserId(data: FindByIdRequest): Promise<DrawBoardsResponse> {
    const user = await this.userRepository.findOne({
      where: { id: data.id },
      relations: ['boards_member'],
    });
    if (!user) throw new RpcException('Cannot find board');
    return { boards: user.boards_member };
  }

  async findByWorkspaceId(data: FindByIdRequest): Promise<DrawBoardsResponse> {
    const workspace = await this.workspaceRepository.findOne({
      where: { id: data.id },
      relations: {
        boards: true,
      },
    });
    if (!workspace) throw new RpcException('Cannot find board');
    console.log(workspace);
    return { boards: workspace.boards };
  }
}
