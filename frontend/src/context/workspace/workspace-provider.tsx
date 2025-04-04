import { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@/context/auth/auth-context.ts';
import { api } from '@/lib/api.ts';
import { useParams } from '@tanstack/react-router';
import {
  CreateBoardContext,
  CreateWorkspaceContext,
  EditWorkspaceContext,
  WorkspaceContext,
} from '@/context/workspace/workspace-context.ts';
import { toast } from 'sonner';

export const WorkspaceProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // @ts-ignore
  const { shortname } = useParams<{ shortname: string }>({});
  // @ts-ignore
  const { id: boardId } = useParams<{ id: number }>({});
  const [iWantWorkspace, setWantWorkspace] = useState(false);
  const [iWantWorkspaceByBoard, setWantWorkspaceByBoard] = useState(false);
  const queryClient = useQueryClient();
  const { token } = useAuth();

  useEffect(() => {
    if (shortname) {
      setWantWorkspace(true);
    }
  }, [shortname]);

  const { data: workspaces, isPending: isPendingWorkspaces } = useQuery({
    queryKey: ['getUsersWorkspaces'],
    queryFn: async () => await api.getUsersWorkspaces(token!),
    enabled: !!token,
  });

  const { data: thisWorkspace, isPending: isPendingThisWorkspace } = useQuery({
    queryKey: ['getWorkspace', shortname],
    queryFn: async () => await api.getCurrentWorkspace(shortname, token!),
    enabled: !!token && !!shortname && iWantWorkspace,
  });

  const createWorkspace = useMutation({
    mutationFn: async (workspace: CreateWorkspaceContext) => {
      await api.createWorkspace(workspace, token!);
    },
    onError: () => {
      return toast('Error creating workspace');
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['getUsersWorkspaces'] });
    },
  });

  const editWorkspace = useMutation({
    mutationFn: async (workspace: EditWorkspaceContext) => {
      await api.editWorkspace(workspace, token!);
    },
    onError: () => {
      return toast('Error updating workspace');
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['getUsersWorkspaces', 'getWorkspace'],
      });
    },
  });

  const { data: boardsInWorkspace, isPending: isPendingBoardsInWorkspace } =
    useQuery({
      queryKey: ['getBoardsInWorkspace', thisWorkspace?.id],
      queryFn: async () =>
        await api.getBoardsInWorkspace(thisWorkspace.id, token!),
      enabled: !!token && !!thisWorkspace?.id,
    });

  const { data: workspaceByBoard, isPending: isPendingWorkspaceByBoard } =
    useQuery({
      queryKey: ['getWorkspaceByBoard', boardId],
      queryFn: async () => await api.getWorkspaceByBoardId(boardId),
      enabled: !!boardId && iWantWorkspaceByBoard,
    });

  const { data: attendedBoards, isPending: isPendingAttendedBoards } = useQuery(
    {
      queryKey: ['getAttendedBoards'],
      queryFn: async () => await api.getAttendedBoards(token!),
      enabled: !!token,
    },
  );

  const createBoard = useMutation({
    mutationFn: async (data: CreateBoardContext) => {
      await api.createBoard(data, token!);
    },
    onError: () => {
      return toast('Error creating board');
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['getBoardsInWorkspace', 'getAttendedBoards'],
      });
    },
  });
  return (
    <WorkspaceContext.Provider
      value={{
        workspaces,
        isPendingWorkspaces: isPendingWorkspaces,
        createWorkspace: createWorkspace.mutateAsync,
        setWantWorkspace,
        thisWorkspace,
        isPendingThisWorkspace: isPendingThisWorkspace,
        editWorkspace: editWorkspace.mutateAsync,
        createBoard: createBoard.mutateAsync,
        boardsInWorkspace,
        isPendingBoardsInWorkspace,
        workspaceByBoard,
        isPendingWorkspaceByBoard,
        setWantWorkspaceByBoard,
        attendedBoards,
        isPendingAttendedBoards,
      }}
    >
      {children}
    </WorkspaceContext.Provider>
  );
};
