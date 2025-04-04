import { createFileRoute, redirect } from '@tanstack/react-router';

async function isAuthenticated() {
  return localStorage.getItem('token');
}

export const Route = createFileRoute('/__authenticated')({
  beforeLoad: async ({ location }) => {
    if (!(await isAuthenticated())) {
      throw redirect({
        to: '/login',
        search: {
          redirect: location.href,
        },
      });
    }
  },
});
