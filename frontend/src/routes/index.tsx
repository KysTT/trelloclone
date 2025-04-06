import { createFileRoute } from '@tanstack/react-router';
import { MyHeader } from '@/components/header.tsx';

export const Route = createFileRoute('/')({
  component: Index,
});

function Index() {
  return (
    <>
      <MyHeader inWorkspaces={false} />
    </>
  );
}
