import { TypeOrmModule } from '@nestjs/typeorm';
import { forwardRef, Module } from '@nestjs/common';
import { Board } from '@modules/datasource/entities/board.entity';
import { BoardsController } from '@modules/board/boards.controller';
import { BoardsService } from '@modules/board/boards.service';
import { UserModule } from '@modules/user/user.module';
import { Category } from '@modules/datasource/entities/category.entity';
import { User } from '@modules/datasource/entities/user.entity';
import { WorkspaceModule } from '@modules/workspace/workspace.module';
import { Workspace } from '@modules/datasource/entities/workspace.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Board, Category, User, Workspace]),
    UserModule,
    forwardRef(() => WorkspaceModule),
  ],
  providers: [BoardsService],
  controllers: [BoardsController],
  exports: [BoardsService],
})
export class BoardsModule {}
