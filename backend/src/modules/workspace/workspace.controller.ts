import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { WorkspaceService } from '@modules/workspace/workspace.service';
import { JwtAuthGuard } from '@modules/auth/jwt-auth.guard';
import {
  DrawWorkspaceDTO,
  DrawWorkspaceDTONoBoards,
} from '@modules/workspace/dto/draw-workspace.dto';
import { CommonWorkspaceDto } from '@modules/workspace/dto/common-workspace.dto';
import { UserRequest } from '@/common/user-request.decorator';
import { User } from '@modules/datasource/entities/user.entity';

@Controller('api/workspace')
export class WorkspaceController {
  constructor(private readonly workspaceService: WorkspaceService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async create(
    @UserRequest() user: User,
    @Body() data: CommonWorkspaceDto,
  ): Promise<DrawWorkspaceDTO> {
    return await this.workspaceService.create({
      user: user,
      name: data.name,
      shortname: data.shortname,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get('my')
  async findAllByUser(@Req() req): Promise<DrawWorkspaceDTONoBoards[]> {
    const id = parseInt(req.user.id);
    return await this.workspaceService.findAllByUser(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put('update')
  async editWorkspace(
    @Body() data: CommonWorkspaceDto,
  ): Promise<DrawWorkspaceDTO> {
    return this.workspaceService.editWorkspace(data);
  }

  @Get('byBoard/:id')
  async getByBoardId(
    @Param() data: CommonWorkspaceDto,
  ): Promise<DrawWorkspaceDTO> {
    console.log(typeof data.id);
    return this.workspaceService.findByBoardId(data.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':shortname')
  async findByShortname(
    @Param() data: CommonWorkspaceDto,
  ): Promise<DrawWorkspaceDTONoBoards> {
    return await this.workspaceService.findByShortname(data.shortname);
  }
}
