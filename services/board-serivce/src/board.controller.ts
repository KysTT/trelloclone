import { Controller, UseInterceptors } from '@nestjs/common';
import { BoardService } from './board.service';
import {
  BOARD_SERVICE_NAME,
  BoardServiceController,
  CreateBoardRequest,
  DrawBoardResponse,
  DrawBoardsResponse,
  FindByIdRequest,
} from '@/interfaces/board';
import { JwtAuthInterceptor } from '@/jwt.interceptor';
import { GrpcMethod } from '@nestjs/microservices';

@Controller('api/board')
export class BoardController implements BoardServiceController {
  constructor(private readonly boardService: BoardService) {}

  @UseInterceptors(JwtAuthInterceptor)
  @GrpcMethod(BOARD_SERVICE_NAME, 'create')
  async create(data: CreateBoardRequest): Promise<DrawBoardResponse> {
    return await this.boardService.create(data);
  }

  @GrpcMethod(BOARD_SERVICE_NAME, 'findById')
  async findById(data: FindByIdRequest): Promise<DrawBoardResponse> {
    return await this.boardService.findById(data);
  }

  @UseInterceptors(JwtAuthInterceptor)
  @GrpcMethod(BOARD_SERVICE_NAME, 'findByUserId')
  async findByUserId(data: FindByIdRequest): Promise<DrawBoardsResponse> {
    return await this.boardService.findByUserId(data);
  }

  @UseInterceptors(JwtAuthInterceptor)
  @GrpcMethod(BOARD_SERVICE_NAME, 'findByWorkspaceId')
  async findByWorkspaceId(data: FindByIdRequest): Promise<DrawBoardsResponse> {
    return await this.boardService.findByWorkspaceId(data);
  }
}
