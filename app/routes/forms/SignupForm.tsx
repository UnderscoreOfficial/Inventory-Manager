import Input from "~/components/ui/Input";
import Button from "~/components/ui/Button";
import { useFetcher } from "react-router";
import { validateData } from "~/.server/utils";
import type { Route } from "./+types/SignupForm";
import { SignupFormSchema } from "~/.server/schemas";

export async function action({ request }: Route.ActionArgs) {
  // get & validate form data
  const form_data = await request.formData();

  const [data, errors] = validateData(form_data, SignupFormSchema);

  if (errors) {
    return { errors };
  }
  return data;
}

export default function SignupForm() {
  const fetcher = useFetcher();
  // const data = fetcher.data ?? undefined;
  return (
    <div className="flex h-lvh w-full items-center justify-center">
      <fetcher.Form
        method="post"
        action="/signup"
        className="flex max-w-96 flex-col gap-2"
        name="form"
      >
        <Input
          name="username"
          label="Email"
          error={fetcher.data?.errors?.email?._errors[0]}
        />
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
        <Input
          name="confirm_password"
          type="password"
          label="Confirm Password"
          error={fetcher.data?.errors?.confirm_password?._errors[0]}
        />
        <div className="flex gap-2">
          <Button type="link" to="/login" className="w-2/3">
            Login
          </Button>
          <Button type="submit" className="w-1/3">
            Signup
          </Button>
        </div>
      </fetcher.Form>
    </div>
  );
}
