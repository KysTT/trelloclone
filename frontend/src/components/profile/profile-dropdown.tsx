import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button.tsx';
import { LogOut } from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';
import { useAuth } from '@/context/auth/auth-context.ts';

interface UserDropdownProps {
  data: {
    name: string;
    email: string;
    username: string;
  };
}

export function ProfileDropdown({ data }: UserDropdownProps) {
  // @ts-ignore
  const { name, email, username } = data;
  const { logout } = useAuth();
  const navigate = useNavigate();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">Profile</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{name}</DropdownMenuLabel>
        <DropdownMenuLabel>{email}</DropdownMenuLabel>
        <DropdownMenuLabel>{username}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          variant="destructive"
          onClick={async () => {
            await logout();
            await navigate({ to: '/' });
          }}
        >
          <LogOut />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
