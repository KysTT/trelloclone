import { useState } from 'react';
import { api } from '@/lib/api.ts';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import {
  AuthContext,
  LoginData,
  RegisterData,
} from '@/context/auth/auth-context.ts';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const queryClient = useQueryClient();
  const [token, setToken] = useState(localStorage.getItem('token'));
  const { data: user, isPending: isPendingUser } = useQuery({
    queryKey: ['getCurrentUser'],
    queryFn: async () => await api.getCurrentUser(token!),
    enabled: !!token,
  });

  const loginMutation = useMutation({
    mutationFn: async (value: LoginData) => {
      return await api.login(value);
    },
    onError: () => {
      loginMutation.reset();
      return toast('Failed to login');
    },
    onSuccess: async (token) => {
      localStorage.setItem('token', token);
      setToken(token);
      await queryClient.invalidateQueries({ queryKey: ['getCurrentUser'] });
    },
  });

  const registerMutation = useMutation({
    mutationFn: async (value: RegisterData) => {
      await api.register(value);
    },
    onError: () => {
      registerMutation.reset();
      return toast('Failed to register user');
    },
  });

  const logout = async () => {
    localStorage.removeItem('token');
    setToken(null);
    await queryClient.invalidateQueries({
      queryKey: ['getCurrentUser', 'getUsersWorkspaces'],
    });
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user: user ?? null,
        login: loginMutation.mutateAsync,
        isPendingUser: isPendingUser,
        register: registerMutation.mutateAsync,
        logout: logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
