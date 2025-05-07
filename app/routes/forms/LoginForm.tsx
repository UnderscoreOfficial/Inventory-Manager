import Input from "~/components/ui/Input";
import Button from "~/components/ui/Button";
import { Link, useFetcher } from "react-router";
import type { Route } from "./+types/LoginForm";
import { LoginFormSchema } from "~/.server/schemas";
import { validateData } from "~/.server/utils";

export async function action({ request }: Route.ActionArgs) {
  // get & validate form data
  const form_data = await request.formData();

  const [data, errors] = validateData(form_data, LoginFormSchema);

  if (errors) {
    return { errors };
  }
  return data;
}

export default function LoginForm() {
  const fetcher = useFetcher();
  // const data = fetcher.data ?? undefined;
  return (
    <div className="flex h-lvh w-full items-center justify-center">
      <fetcher.Form
        method="post"
        action="/login"
        className="flex max-w-96 flex-col gap-2"
        name="form"
      >
        <Input
          name="email"
          label="Email"
          error={fetcher.data?.errors?.email?._errors[0]}
        />
        <Input
          name="password"
          type="password"
          label="Password"
          error={fetcher.data?.errors?.password?._errors[0]}
        />
        <div className="flex gap-2">
          <Button type="link" to="/signup" className="w-2/3">
            Signup
          </Button>
          <Button type="submit" className="w-1/3">
            Login
          </Button>
        </div>
      </fetcher.Form>
    </div>
  );
}
