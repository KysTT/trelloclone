import { forwardRef, Module } from '@nestjs/common';
import { WorkspaceController } from '@modules/workspace/workspace.controller';
import { WorkspaceService } from '@modules/workspace/workspace.service';
import { Workspace } from '@modules/datasource/entities/workspace.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '@modules/user/user.module';
import { User } from '../datasource/entities/user.entity';
import { BoardsModule } from '@modules/board/boards.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Workspace, User]),
    UserModule,
    forwardRef(() => BoardsModule),
  ],
  providers: [WorkspaceService],
  controllers: [WorkspaceController],
  exports: [WorkspaceService],
})
export class WorkspaceModule {}
