import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu.tsx';
import { Button } from '@/components/ui/button.tsx';
import { CreateWorkspaceDialog } from '@/components/workspace/create-workspace-dialog.tsx';
import { Link } from '@tanstack/react-router';
import { useState } from 'react';
import { Workspace } from '@/context/workspace/workspace-context.ts';

interface WorkspaceDropdownProps {
  data?: Workspace[];
}

export function WorkspaceDropdownMenu({ data }: WorkspaceDropdownProps) {
  const [needToSetWorkspaces, setNeedToSetWorkspaces] = useState(true);
  const [workspaces, setWorkspaces] = useState(undefined);
  if (data && needToSetWorkspaces) {
    // @ts-ignore
    setWorkspaces(data);
    setNeedToSetWorkspaces(false);
  }

  return (
    <DropdownMenu
      onOpenChange={() => {
        // workspaces && data ? setWorkspaces(data) : false;
      }}
    >
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">Workspaces</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {
          // @ts-ignore
          workspaces === undefined || workspaces.length === 0 ? (
            <CreateWorkspaceDialog />
          ) : (
            <>
              {
                // @ts-ignore
                workspaces.map((workspace, index) => (
                  <DropdownMenuGroup key={index}>
                    <Link
                      to="/workspace/$shortname"
                      params={{
                        // @ts-ignore
                        shortname: workspace.shortname,
                      }}
                    >
                      <Button variant="ghost" className="w-full">
                        {
                          // @ts-ignore
                          workspace.name
                        }
                      </Button>
                    </Link>
                  </DropdownMenuGroup>
                ))
              }
            </>
          )
        }
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
