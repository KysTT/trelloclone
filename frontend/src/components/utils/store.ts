import { Workspace } from '@/context/workspace/workspace-context.ts';
import { Store } from '@tanstack/store';

interface WorkspaceState {
  thisWorkspace: Workspace | null;
}

const store = new Store<WorkspaceState>({
  thisWorkspace: null,
});

export default store;
