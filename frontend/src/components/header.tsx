import { SidebarTrigger } from '@/components/ui/sidebar.tsx';
import { Separator } from '@/components/ui/separator.tsx';
import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button.tsx';
import { ProfileDropdown } from '@/components/profile/profile-dropdown.tsx';
import { WorkspaceDropdownMenu } from '@/components/workspace/workspaces-dropdown.tsx';
import { useAuth } from '@/context/auth/auth-context';
import { useWorkspace } from '@/context/workspace/workspace-context.ts';

export function MyHeader({ inWorkspaces }: { inWorkspaces: boolean }) {
  const { user, isPendingUser } = useAuth();
  const { workspaces, isPendingWorkspaces } = useWorkspace();
  return (
    <>
      <header className="group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 flex h-12 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear">
        <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
          {inWorkspaces ? (
            <>
              <SidebarTrigger className="-ml-1" />
              <Separator
                orientation="vertical"
                className="mx-2 data-[orientation=vertical]:h-4"
              />
            </>
          ) : (
            <></>
          )}
          <Link
            to="/"
            children={() => <Button variant="ghost"> TrelloClone </Button>}
          />
          <WorkspaceDropdownMenu
            data={isPendingWorkspaces ? undefined : workspaces}
          />
          <div className="ml-auto">
            {!isPendingUser ? (
              // @ts-ignore
              <ProfileDropdown data={user} />
            ) : (
              <Link to="/login" children={() => <Button> Login </Button>} />
            )}
          </div>
        </div>
      </header>
    </>
  );
}
