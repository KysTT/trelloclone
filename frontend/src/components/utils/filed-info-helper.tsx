import { AnyFieldApi } from '@tanstack/react-form';

export function FieldInfo({ field }: { field: AnyFieldApi }) {
  return (
    <>
      {field.state.meta.errors[0] ? (
        <em role="alert">{field.state.meta.errors[0].message}</em>
      ) : null}
    </>
  );
}
