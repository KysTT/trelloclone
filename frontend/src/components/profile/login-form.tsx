import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { z } from 'zod';
import { formOptions, useForm } from '@tanstack/react-form';
import { Link, useNavigate, useSearch } from '@tanstack/react-router';
import * as React from 'react';
import { FieldInfo } from '@/components/utils/filed-info-helper.tsx';
import { useAuth } from '@/context/auth/auth-context.ts';

const userLoginSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  const { login } = useAuth();
  const navigate = useNavigate();
  const search = useSearch({ strict: false });
  // @ts-ignore
  const redirect = search.redirect || '/';
  const formOpts = formOptions({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const form = useForm({
    ...formOpts,
    validators: {
      onChange: userLoginSchema,
    },
    onSubmit: async (data) => {
      await login(data.value);
      await navigate({ to: redirect });
    },
  });

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
          >
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <form.Field
                  name="email"
                  children={(fieldEmail) => (
                    <>
                      <Label>Email</Label>
                      <Input
                        placeholder="JohnDoe@gmail.com"
                        value={fieldEmail.state.value}
                        onBlur={fieldEmail.handleBlur}
                        onChange={(e) =>
                          fieldEmail.handleChange(e.target.value)
                        }
                      />
                      <FieldInfo field={fieldEmail} />
                    </>
                  )}
                />
              </div>
              <div className="grid gap-2">
                <form.Field
                  name="password"
                  children={(fieldPassword) => (
                    <>
                      <Label>Password</Label>
                      <Input
                        type="password"
                        value={fieldPassword.state.value}
                        onBlur={fieldPassword.handleBlur}
                        onChange={(e) =>
                          fieldPassword.handleChange(e.target.value)
                        }
                      />
                      <FieldInfo field={fieldPassword} />
                    </>
                  )}
                />
              </div>
              <form.Subscribe
                selector={(state) => [state.canSubmit, state.isSubmitting]}
                children={([canSubmit, isSubmitting]) => (
                  <>
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={!canSubmit}
                    >
                      {isSubmitting ? '...' : 'Login'}
                    </Button>
                  </>
                )}
              />
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{' '}
              <Link
                to="/register"
                className="underline underline-offset-4"
                children={() => 'Sign up'}
              />
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
