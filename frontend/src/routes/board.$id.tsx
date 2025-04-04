import { createFileRoute, useParams } from '@tanstack/react-router';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar.tsx';
import React from 'react';
import {
  useWorkspace,
  Workspace,
} from '@/context/workspace/workspace-context.ts';
import { WorkspacesSidebar } from '@/components/workspace/workspaces-sidebar.tsx';
import { MyHeader } from '@/components/header.tsx';
import store from '@/components/utils/store.ts';

export const Route = createFileRoute('/board/$id')({
  component: RouteComponent,
});

function RouteComponent({ children }: { children: React.ReactNode }) {
  // @ts-ignore
  const { id } = useParams<{ id: number }>({});
  const { setWantWorkspaceByBoard } = useWorkspace();
  let workspaceByBoard: Workspace | null = null;
  let isPendingWorkspaceByBoard: boolean = false;

  const thisWorkspace = store.state.thisWorkspace;
  if (
    (thisWorkspace &&
      !thisWorkspace?.boards?.find((board) => board.id === parseInt(id))) ||
    !thisWorkspace
  ) {
    setWantWorkspaceByBoard(true);
    ({ workspaceByBoard, isPendingWorkspaceByBoard } = useWorkspace());
  }

  if (workspaceByBoard) {
    setWantWorkspaceByBoard(false);
    store.setState((state) => {
      return {
        ...state,
        thisWorkspace: workspaceByBoard,
      };
    });
  }

  return (
    <>
      {isPendingWorkspaceByBoard ? (
        'loading workspace...'
      ) : (
        <>
          <SidebarProvider>
            {children}
            <WorkspacesSidebar variant="inset" data={thisWorkspace!} />
            <SidebarInset>
              <MyHeader inWorkspaces={true} />
            </SidebarInset>
          </SidebarProvider>
        </>
      )}
    </>
  );
}
