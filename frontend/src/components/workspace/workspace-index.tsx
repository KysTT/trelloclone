import {
  useWorkspace,
  Workspace,
} from '@/context/workspace/workspace-context.ts';
import { Avatar, AvatarFallback } from '@/components/ui/avatar.tsx';
import { Button } from '@/components/ui/button.tsx';
import { PenBox } from 'lucide-react';
import { useState } from 'react';
import { EditWorkspaceInfo } from '@/components/workspace/edit-workspace-info.tsx';
import { CreateBoardDropdown } from '@/components/workspace/create-board-dropdown.tsx';
import { Link } from '@tanstack/react-router';

interface ThisWorkspaceProps {
  thisWorkspace: Workspace;
}

export function WorkspaceIndex({ thisWorkspace }: ThisWorkspaceProps) {
  const { boardsInWorkspace, isPendingBoardsInWorkspace } = useWorkspace();
  const [editing, setEditing] = useState(false);

  return (
    <>
      <div className="flex align-top justify-center w-4xl ml-auto mr-auto mt-2">
        {editing ? (
          <EditWorkspaceInfo
            thisWorkspace={thisWorkspace}
            setEditing={setEditing}
          />
        ) : (
          <div className="flex w-auto mr-auto">
            <Avatar className="size-20 rounded-sm mr-2">
              <AvatarFallback className="rounded-none text-3xl">
                {thisWorkspace.name[0]}
              </AvatarFallback>
            </Avatar>
            <span className="text-3xl mr-1">{thisWorkspace.name}</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setEditing(!editing);
              }}
            >
              <PenBox />
            </Button>
          </div>
        )}
      </div>
      <hr className="w-4xl mt-2 mr-auto ml-auto" />
      <div
        className="flex flex-wrap
              justify-normal
              w-full
              mr-auto
              ml-auto
              max-w-4xl
              mt-4
              gap-4"
      >
        {!isPendingBoardsInWorkspace
          ? boardsInWorkspace!.map((board, index) => (
              <Link
                to="/board/$id"
                params={{
                  id: board.id,
                }}
                key={index}
              >
                <Button
                  key={index}
                  className="min-w-40 h-20 max-w-full flex-1 md:w-1/2 lg:w-1/3"
                  variant="outline"
                >
                  {board.name}
                </Button>
              </Link>
            ))
          : ''}
        <CreateBoardDropdown workspaceId={thisWorkspace.id} />
      </div>
    </>
  );
}
