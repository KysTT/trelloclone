import { createFileRoute } from '@tanstack/react-router';
import React from 'react';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar.tsx';
import { WorkspacesSidebar } from '@/components/workspace/workspaces-sidebar.tsx';
import { MyHeader } from '@/components/header.tsx';
import { useWorkspace } from '@/context/workspace/workspace-context.ts';
import { WorkspaceIndex } from '@/components/workspace/workspace-index.tsx';
import store from '@/components/utils/store.ts';

export const Route = createFileRoute('/__authenticated/workspace/$shortname')({
  component: RouteComponent,
});

function RouteComponent({ children }: { children: React.ReactNode }) {
  const { thisWorkspace, isPendingThisWorkspace, setWantWorkspace } =
    useWorkspace();
  if (thisWorkspace) {
    setWantWorkspace(false);
    store.setState((state) => {
      return {
        ...state,
        thisWorkspace: thisWorkspace,
      };
    });
  }

  return (
    <>
      {isPendingThisWorkspace ? (
        'loading workspace...'
      ) : (
        <>
          <SidebarProvider>
            {children}
            <WorkspacesSidebar variant="inset" data={thisWorkspace} />
            <SidebarInset>
              <MyHeader inWorkspaces={true} />
              <WorkspaceIndex thisWorkspace={thisWorkspace} />
            </SidebarInset>
          </SidebarProvider>
        </>
      )}
    </>
  );
}
