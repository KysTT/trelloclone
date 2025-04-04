import { InjectRepository } from '@nestjs/typeorm';
import { Board } from '@modules/datasource/entities/board.entity';
import { Repository } from 'typeorm';
import {
  forwardRef,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Category } from '@modules/datasource/entities/category.entity';
import { CreateBoardDto } from '@modules/board/dto/create-board.dto';
import { WorkspaceService } from '@modules/workspace/workspace.service';
import { Workspace } from '@modules/datasource/entities/workspace.entity';
import { UserService } from '@modules/user/user.service';
import { User } from '@modules/datasource/entities/user.entity';
import { plainToInstance } from 'class-transformer';
import { DrawBoardDto } from '@modules/board/dto/draw-board.dto';

@Injectable()
export class BoardsService {
  @InjectRepository(Board)
  private boardRepository: Repository<Board>;
  @InjectRepository(User)
  private userRepository: Repository<User>;
  @InjectRepository(Category)
  private categoryRepository: Repository<Category>;
  @InjectRepository(Workspace)
  private readonly workspaceRepository: Repository<Workspace>;

  constructor(
    @Inject(forwardRef(() => WorkspaceService))
    private workspaceService: WorkspaceService,
    private userService: UserService,
  ) {}

  async findById(id: number): Promise<Board> {
    const board = await this.boardRepository.findOne({
      where: {
        id: id,
      },
      relations: ['workspace'],
    });
    if (!board) {
      throw new NotFoundException('No board');
    }
    return board;
  }

  async findByWorkspace(id: number) {
    const workspace = await this.workspaceService.findByIdDto(id);
    return workspace.boards;
  }

  async findAttended(id: number) {
    const user = await this.userService.findOneById(id);
    return plainToInstance(DrawBoardDto, user.boards_member, {
      excludeExtraneousValues: true,
    });
  }

  async createBoard(data: CreateBoardDto): Promise<DrawBoardDto> {
    const { name, visibility } = data;
    const workspace = await this.workspaceService.findById(data.workspaceId);
    const user = await this.userService.findOneById(data.userId);
    const categoryIP = this.categoryRepository.create({
      name: 'In progress',
    });
    const categoryTD = this.categoryRepository.create({
      name: 'To do',
    });
    const categoryDone = this.categoryRepository.create({
      name: 'Done',
    });
    await this.categoryRepository.save([categoryIP, categoryTD, categoryDone]);

    try {
      const board = await this.boardRepository.save({
        name,
        workspace,
        categories: [categoryIP, categoryTD, categoryDone],
        members: [user],
        visibility,
      });

      return plainToInstance(DrawBoardDto, board, {
        excludeExtraneousValues: true,
      });
      // workspace.boards = [...workspace.boards, board];
      // await this.workspaceRepository.save(workspace);
      // user.boards_member = [...user.boards_member, board];
      // await this.userRepository.save(user);
    } catch (err) {
      throw new InternalServerErrorException('Failed to create board');
    }
  }
}
