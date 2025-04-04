import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { BoardsService } from '@modules/board/boards.service';
import { JwtAuthGuard } from '@modules/auth/jwt-auth.guard';
import { DrawBoardDto } from '@modules/board/dto/draw-board.dto';

@Controller('api/board')
export class BoardsController {
  constructor(private readonly boardService: BoardsService) {}

  @UseGuards(JwtAuthGuard)
  @Get('byWorkspace/:id')
  async findByWorkspace(@Param('id') id: number) {
    return await this.boardService.findByWorkspace(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async createBoard(
    @Body('name') name: string,
    @Body('workspaceId') workspaceId: number,
    @Body('visibility') visibility: string,
    @Req() req,
  ): Promise<DrawBoardDto> {
    return this.boardService.createBoard({
      name,
      workspaceId,
      userId: parseInt(req.user.id),
      visibility,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get('attended')
  async getAttended(@Req() req) {
    return this.boardService.findAttended(req.user.id);
  }
}
