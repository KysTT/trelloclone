import { createContext, useContext } from 'react';

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  workspaces: object[];
  attached_card: object[];
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData extends LoginData {
  name: string;
  username: string;
}

export interface AuthContextType {
  token: string | null;
  user: User | null;
  login: (credentials: LoginData) => Promise<void>;
  isPendingUser: boolean;
  register: (credentials: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('Missing AuthProvider');
  }
  return context;
};
