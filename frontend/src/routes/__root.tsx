import * as React from 'react';
import { createRootRoute, Outlet } from '@tanstack/react-router';
import { Toaster } from 'sonner';
import { AuthProvider } from '@/context/auth/auth-provider.tsx';
import { WorkspaceProvider } from '@/context/workspace/workspace-provider.tsx';

export const Route = createRootRoute({
  component: RootComponent,
});

export function RootComponent() {
  return (
    <React.Fragment>
      <AuthProvider>
        <WorkspaceProvider>
          <Outlet />
          <Toaster />
        </WorkspaceProvider>
      </AuthProvider>
    </React.Fragment>
  );
}
