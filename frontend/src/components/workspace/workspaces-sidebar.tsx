import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar.tsx';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar.tsx';
import {
  useWorkspace,
  Workspace,
} from '@/context/workspace/workspace-context.ts';
import { Button } from '@/components/ui/button.tsx';
import { MoreHorizontalIcon, PlusIcon } from 'lucide-react';
import { useState } from 'react';
import { Link } from '@tanstack/react-router';

interface WorkspacesSidebarProps {
  data: Workspace;
}

export function WorkspacesSidebar({
  data,
  ...props
}: WorkspacesSidebarProps & React.ComponentProps<typeof Sidebar>) {
  const [moreVisible, setMoreVisible] = useState(false);
  const workspace = data;
  const { attendedBoards, isPendingAttendedBoards } = useWorkspace();
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent className="flex flex-col gap-2">
            <SidebarMenu>
              <SidebarMenuItem className="flex items-center gap-2">
                <Avatar className="size-10 rounded-sm">
                  <AvatarImage src="" />
                  <AvatarFallback className="rounded-none text-xl">
                    {workspace.name[0]}
                  </AvatarFallback>
                </Avatar>
                <span className="text-2xl">{workspace.name}</span>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupContent className="flex flex-col gap-2">
            <SidebarMenu>
              <div
                className="flex"
                onMouseEnter={() => setMoreVisible(true)}
                onMouseLeave={() => setMoreVisible(false)}
              >
                Your Boards
                <div className="flex gap-1 ml-auto">
                  <Button
                    variant="ghost"
                    hidden={!moreVisible}
                    children={<MoreHorizontalIcon />}
                    className="h-8 w-8 rounded-s-sm"
                  />
                  <Button
                    variant="ghost"
                    children={<PlusIcon />}
                    className="h-8 w-8 rounded-s-sm"
                  />
                </div>
              </div>
              {isPendingAttendedBoards ? (
                ''
              ) : (
                <div className="gap-2">
                  {attendedBoards.map((board, index) => (
                    <Link
                      to="/board/$id"
                      params={{
                        id: board.id,
                      }}
                      key={index}
                    >
                      <SidebarMenuButton className="p-0 mb-2" key={index}>
                        <span className="text-xl h-fit">{board.name}</span>
                      </SidebarMenuButton>
                    </Link>
                  ))}
                </div>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
