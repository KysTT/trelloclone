import { useWorkspace } from '@/context/workspace/workspace-context.ts';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu.tsx';
import { Button } from '@/components/ui/button.tsx';
import { useForm } from '@tanstack/react-form';
import { z } from 'zod';
import { Label } from '@/components/ui/label.tsx';
import { Input } from '@/components/ui/input.tsx';
import { FieldInfo } from '@/components/utils/filed-info-helper.tsx';
import { useState } from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover.tsx';
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command.tsx';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils.ts';

interface CreateBoardDropdownProps {
  workspaceId: number;
}

const createBoardSchema = z.object({
  name: z.string().nonempty('Board title is required'),
  visibility: z.string(),
});

const visibility = [
  {
    value: 'private',
    label: 'Private',
  },
  {
    value: 'workspace',
    label: 'Workspace only',
  },
  {
    value: 'public',
    label: 'Public',
  },
];

export function CreateBoardDropdown({ workspaceId }: CreateBoardDropdownProps) {
  const { createBoard } = useWorkspace();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const form = useForm({
    defaultValues: {
      name: '',
      visibility: '',
    },
    validators: {
      onChange: createBoardSchema,
    },
    onSubmit: async (values) => {
      createBoard({ ...values.value, workspaceId });
      setOpen(false);
    },
  });
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          children={'Create new board'}
          className="min-w-40 h-20 max-w-40 flex-1 md:w-1/2 lg:w-1/3"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex flex-col gap-6">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <div className="flex flex-col gap-6 m-2">
            <div className="grid gap-2">
              <form.Field
                name="name"
                children={(boardNameField) => (
                  <>
                    <Label>Board title</Label>
                    <Input
                      placeholder=""
                      value={boardNameField.state.value}
                      onBlur={boardNameField.handleBlur}
                      onChange={(e) =>
                        boardNameField.handleChange(e.target.value)
                      }
                    />
                    <FieldInfo field={boardNameField} />
                  </>
                )}
              />
            </div>
            <div className="grid gap-2">
              <form.Field
                name="visibility"
                children={(boardVisibilityField) => (
                  <>
                    <Label>Visibility</Label>
                    <Popover open={open} onOpenChange={setOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="ghost"
                          role="combobox"
                          aria-expanded={open}
                          defaultValue="Workspace only"
                          className="w-[200px] justify-between"
                        >
                          {value
                            ? visibility.find(
                                (visibility) => visibility.value === value,
                              )?.label
                            : 'Select visibility...'}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] p-0">
                        <Command>
                          <CommandInput placeholder="Select visibility..." />
                          <CommandGroup>
                            {visibility.map((visibility) => (
                              <CommandItem
                                key={visibility.value}
                                value={visibility.value}
                                onSelect={(cur) => {
                                  setValue(cur === value ? '' : cur);
                                  boardVisibilityField.handleChange(cur);
                                  setOpen(false);
                                }}
                              >
                                <Check
                                  className={cn(
                                    'mr-2 h-4 w-4',
                                    value === visibility.value
                                      ? 'opacity-100'
                                      : 'opacity-0',
                                  )}
                                />
                                {visibility.label}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
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
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
