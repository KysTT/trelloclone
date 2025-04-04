import { createFileRoute } from '@tanstack/react-router';
import { RegisterForm } from '@/components/profile/register-form';
import { MyHeader } from '@/components/header.tsx';

export const Route = createFileRoute('/register')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <MyHeader inWorkspaces={false} />
      <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm">
          <RegisterForm />
        </div>
      </div>
    </>
  );
}
