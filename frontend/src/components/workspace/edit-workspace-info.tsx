import {
  useWorkspace,
  Workspace,
} from '@/context/workspace/workspace-context.ts';
import { useForm } from '@tanstack/react-form';
import { Label } from '@/components/ui/label.tsx';
import { Input } from '@/components/ui/input.tsx';
import { FieldInfo } from '@/components/utils/filed-info-helper.tsx';
import { z } from 'zod';
import { Button } from '@/components/ui/button.tsx';
import { useNavigate } from '@tanstack/react-router';

const EditWorkspaceSchema = z.object({
  name: z.string().nonempty('Name cannot be empty'),
  shortname: z
    .string()
    .regex(
      /^(?=.{3,20}$)(?![_.-])(?!.*[_.-]{2})[a-zA-Z1-9_-]+$/,
      '3-20 characters, no special characters except _-',
    ),
});

export function EditWorkspaceInfo({
  thisWorkspace,
  setEditing,
}: {
  thisWorkspace: Workspace;
  setEditing: (arg: boolean) => void;
}) {
  const { editWorkspace } = useWorkspace();
  const navigate = useNavigate();
  const form = useForm({
    defaultValues: {
      name: thisWorkspace.name,
      shortname: thisWorkspace.shortname,
    },
    validators: {
      onChange: EditWorkspaceSchema,
    },
    onSubmit: async (values) => {
      editWorkspace({ ...values.value, id: thisWorkspace.id });
      setEditing(false);
      await navigate({ to: '/workspace/' + values.value.shortname });
    },
  });
  return (
    <form
      className="flex flex-col gap-4 w-auto mr-auto"
      onSubmit={async (e) => {
        e.preventDefault();
        await form.handleSubmit();
      }}
    >
      <div className="flex flex-col gap-4 w-auto mr-auto">
        <div className="grid gap-2">
          <form.Field
            name="name"
            children={(fieldName) => (
              <>
                <Label>Workspace name</Label>
                <Input
                  placeholder={thisWorkspace.name}
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
            name="shortname"
            children={(fieldShortname) => (
              <>
                <Label>Workspace shortname</Label>
                <Input
                  placeholder={thisWorkspace.name}
                  value={fieldShortname.state.value}
                  onBlur={fieldShortname.handleBlur}
                  onChange={(e) => fieldShortname.handleChange(e.target.value)}
                />
                <FieldInfo field={fieldShortname} />
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
                {isSubmitting ? '...' : 'Edit'}
              </Button>
            </>
          )}
        />
        <Button variant="ghost" onClick={() => setEditing(false)}>
          {' '}
          Cancel{' '}
        </Button>
      </div>
    </form>
  );
}
