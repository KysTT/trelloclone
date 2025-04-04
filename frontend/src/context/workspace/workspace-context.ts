import { createContext, useContext } from 'react';

interface BasicContext {
  id: number;
  name: string;
}

export interface CreateWorkspaceContext {
  name: string;
  shortname: string;
}

export interface Workspace extends CreateWorkspaceContext {
  id: number;
  boards?: Board[];
}

interface Board extends BasicContext {
  categories?: Category[];
}

interface Category extends BasicContext {
  cards?: Card[];
}

interface Card extends BasicContext {
  description: string;
  activity: string[];
  attachments?: object[];
  checklists?: Checklist[];
  createdAt: Date;
  lastEditedAt: Date;
  dueTo?: Date;
}

interface Checklist extends BasicContext {
  items?: ChecklistItem[];
}

interface ChecklistItem extends BasicContext {
  done: boolean;
}

export interface EditWorkspaceContext extends CreateWorkspaceContext {
  id: number;
}

export interface CreateBoardContext {
  workspaceId: number;
  name: string;
  visibility: string;
}

export interface WorkspaceContextType {
  workspaces: Workspace[];
  isPendingWorkspaces: boolean;
  setWantWorkspace: (arg: boolean) => void;
  createWorkspace: (arg: CreateWorkspaceContext) => void;
  thisWorkspace: Workspace;
  isPendingThisWorkspace: boolean;
  editWorkspace: (arg: EditWorkspaceContext) => void;
  createBoard: (arg: CreateBoardContext) => void;
  boardsInWorkspace: Board[];
  isPendingBoardsInWorkspace: boolean;
  workspaceByBoard: Workspace;
  isPendingWorkspaceByBoard: boolean;
  setWantWorkspaceByBoard: (arg: boolean) => void;
  attendedBoards: Board[];
  isPendingAttendedBoards: boolean;
}

export const WorkspaceContext = createContext<WorkspaceContextType | undefined>(
  undefined,
);

export const useWorkspace = () => {
  const context = useContext(WorkspaceContext);
  if (!context) throw new Error('Missing AuthProvider');
  return context;
};
