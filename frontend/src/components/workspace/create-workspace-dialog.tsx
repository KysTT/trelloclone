import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog.tsx';
import { useForm } from '@tanstack/react-form';
import { z } from 'zod';
import { Label } from '@/components/ui/label.tsx';
import { Input } from '@/components/ui/input.tsx';
import { FieldInfo } from '@/components/utils/filed-info-helper';
import { Button } from '@/components/ui/button.tsx';
import { useAuth } from '@/context/auth/auth-context.ts';
import { useNavigate } from '@tanstack/react-router';
import { useWorkspace } from '@/context/workspace/workspace-context.ts';

const CreateWorkspaceSchema = z.object({
  name: z.string().nonempty(),
  shortname: z
    .string()
    .regex(
      /^(?=.{3,20}$)(?![_.-])(?!.*[_.-]{2})[a-zA-Z_-]+$/,
      '3-20 characters, no special characters except _-',
    ),
});

export function CreateWorkspaceDialog() {
  const { token } = useAuth();
  const { createWorkspace } = useWorkspace();
  const navigate = useNavigate();
  const form = useForm({
    defaultValues: {
      name: '',
      shortname: '',
    },
    validators: {
      onChange: CreateWorkspaceSchema,
    },
    onSubmit: async (values) => {
      createWorkspace(values.value);
      await navigate({ to: '/workspace/' + values.value.shortname });
    },
  });
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          onClick={async () => {
            if (!token) await navigate({ to: '/login' });
          }}
        >
          Create workspace
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Let's build a Workspace</DialogTitle>
          <DialogDescription>
            Your workspace shortname will be used to access workspace via web
          </DialogDescription>
        </DialogHeader>
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
                children={(workspaceNameField) => (
                  <>
                    <Label>Workspace name</Label>
                    <Input
                      placeholder="Most valuable co."
                      value={workspaceNameField.state.value}
                      onBlur={workspaceNameField.handleBlur}
                      onChange={(e) =>
                        workspaceNameField.handleChange(e.target.value)
                      }
                    />
                    <FieldInfo field={workspaceNameField} />
                  </>
                )}
              />
            </div>
            <div className="grid gap-2">
              <form.Field
                name="shortname"
                children={(workspaceShortnameField) => (
                  <>
                    <Label>Workspace shortname</Label>
                    <Input
                      placeholder="Most-valuable_co"
                      value={workspaceShortnameField.state.value}
                      onBlur={workspaceShortnameField.handleBlur}
                      onChange={(e) =>
                        workspaceShortnameField.handleChange(e.target.value)
                      }
                    />
                    <FieldInfo field={workspaceShortnameField} />
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
                    onClick={(e) => {
                      if (!canSubmit) return;
                      e.preventDefault();
                      form.handleSubmit();
                    }}
                  >
                    {isSubmitting ? '...' : 'Create workspace'}
                  </Button>
                </>
              )}
            />
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
