import { createRouter } from '@tanstack/react-router';
import { QueryClient } from '@tanstack/react-query';
import { routeTree } from './routeTree.gen';
import { AuthContextType } from '@/context/auth/auth-context.ts';
import { WorkspaceContextType } from '@/context/workspace/workspace-context.ts';

declare module '@tanstack/react-router' {
  interface RouterContext {
    queryClient: QueryClient;
    auth: AuthContextType;
    workspace: WorkspaceContextType;
  }
}

export const router = createRouter({
  routeTree,
  context: {
    queryClient: new QueryClient(),
    auth: undefined! as AuthContextType,
    workspace: undefined! as WorkspaceContextType,
  },
});
