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

const userRegisterSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  name: z.string().nonempty('Name is required'),
  username: z
    .string()
    .regex(
      /^(?=.{3,20}$)(?![_.-])(?!.*[_.-]{2})[a-z_-]+$/,
      'Username must be 3-20 characters in lowercase letters including _ and -',
    ),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export function RegisterForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  const { login, register } = useAuth();
  const navigate = useNavigate();
  const search = useSearch({ strict: false });
  // @ts-ignore
  const redirect = search.redirect || '/';
  const formOpts = formOptions({
    defaultValues: {
      email: '',
      name: '',
      username: '',
      password: '',
    },
  });

  const form = useForm({
    ...formOpts,
    validators: {
      onChange: userRegisterSchema,
    },
    onSubmit: async (data) => {
      await register(data.value);
      await login(data.value);
      await navigate({ to: redirect });
    },
  });

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Sing-up</CardTitle>
          <CardDescription>
            Enter your info below to create your account
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
                  name="name"
                  children={(fieldName) => (
                    <>
                      <Label>Name</Label>
                      <Input
                        placeholder="John Doe"
                        value={fieldName.state.value}
                        onBlur={fieldName.handleBlur}
                        onChange={(e) => fieldName.handleChange(e.target.value)}
                      />
                      <FieldInfo field={fieldName} />
                    </>
                  )}
                />
              </div>
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
                  name="username"
                  children={(fieldUsername) => (
                    <>
                      <Label>Username</Label>
                      <Input
                        placeholder="john_doe"
                        value={fieldUsername.state.value}
                        onBlur={fieldUsername.handleBlur}
                        onChange={(e) =>
                          fieldUsername.handleChange(e.target.value)
                        }
                      />
                      <FieldInfo field={fieldUsername} />
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
                      {isSubmitting ? '...' : 'Register'}
                    </Button>
                  </>
                )}
              />
            </div>
            <div className="mt-4 text-center text-sm">
              Already have an account?{' '}
              <Link
                to="/login"
                className="underline underline-offset-4"
                children={() => 'Login'}
              />
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
