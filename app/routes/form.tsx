// test form for inputs
// fetcher form for non page reloads

// this is temp just for having a basic shape of data to properly design forms
// much of the code will be abstracted to use across forms
import type { Route } from "./+types/form";
import Input from "~/components/ui/Input";
import Button from "~/components/ui/Button";
import { useFetcher } from "react-router";
import { string, z, ZodObject, type ZodRawShape } from "zod";

const form_schema = z.object({
  name: z.string().min(1, { message: "Name must be at least 1 character." }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 character." }),
  age: z.preprocess(
    (num) => Number(num),
    z.number().min(18, { message: "Must be at least 18" }),
  ),
  pin: z.preprocess(
    (num) => Number(num),
    z.number().min(6, { message: "Invalid pin!" }),
  ),
});

type ErrorsType = {
  name?: z.ZodError<string>;
  password?: z.ZodError<string>;
  age?: z.ZodError<string>;
  pin?: z.ZodError<string>;
};

function validateData(form_data: FormData, zod_schema: ZodObject<ZodRawShape>) {
  // get form entry names
  const form_entry_names: string[] = [];
  for (const entry of Object.entries(zod_schema.shape)) {
    form_entry_names.push(entry[0]);
  }

  // get form data
  const raw_form_data: { [key: string]: string } = {};
  for (const name of form_entry_names) {
    raw_form_data[name] = String(form_data.get(name));
  }

  // validate form data
  const parsed_data = zod_schema.safeParse(raw_form_data);
  console.log(parsed_data.error?.format());

  return [raw_form_data, parsed_data.error?.format()];
}

export async function action({ request }: Route.ActionArgs) {
  // get & validate form data
  const form_data = await request.formData();

  const [data, errors] = validateData(form_data, form_schema);

  if (errors) {
    return { errors };
  }
}

// type FormErrors = Partial<Record<keyof z.infer<typeof form_schema>, string>>;
//
export default function TestForm() {
  const fetcher = useFetcher();
  const data = fetcher.data ?? undefined;

  // let error: ErrorsType | undefined;
  // if (fetcher.data?.errors) {
  //   error = fetcher.data.errors;
  // }
  return (
    <>
      <fetcher.Form
        method="post"
        className="mt-20 flex w-full flex-col gap-2"
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
    </>
  );
}
