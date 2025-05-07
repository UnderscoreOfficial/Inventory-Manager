// test form for inputs
// fetcher form for non page reloads

import type { Route } from "./+types/TestForm";
import Input from "~/components/ui/Input";
import Button from "~/components/ui/Button";
import { useFetcher } from "react-router";
import { string, z, ZodObject, type ZodRawShape } from "zod";
import { validateData } from "~/.server/utils";
import { TestFormSchema } from "~/.server/schemas";

export async function action({ request }: Route.ActionArgs) {
  // get & validate form data
  const form_data = await request.formData();

  const [data, errors] = validateData(form_data, TestFormSchema);

  if (errors) {
    return { errors };
  }
  return data;
}

export default function TestForm() {
  const fetcher = useFetcher();
  const data = fetcher.data ?? undefined;
  return (
    <fetcher.Form
      method="post"
      action="/form/test"
      className="flex w-full flex-col gap-2"
      name="form"
    >
      <Input
        name="name"
        label="Name"
        error={fetcher.data?.errors?.name?._errors[0]}
      />
      <Input
        name="password"
        type="password"
        label="Password"
        error={fetcher.data?.errors?.password?._errors[0]}
      />
      <Input
        name="age"
        type="number"
        min={18}
        label="Age"
        error={fetcher.data?.errors?.age?._errors[0]}
      />
      <Input
        name="pin"
        type="pin"
        max={6}
        label="Pin"
        error={fetcher.data?.errors?.pin?._errors[0]}
      />
      <Button type="submit" className="w-fit">
        Submit
      </Button>
    </fetcher.Form>
  );
}
export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  return <div className="bg-green-500/50">{String(error)}</div>;
}
