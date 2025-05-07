import type { ActionFunctionArgs } from "react-router";
import { ZodEffects, ZodObject, type ZodRawShape } from "zod";

function getZodShape(
  zod_schema: ZodObject<ZodRawShape> | ZodEffects<ZodObject<ZodRawShape>>,
) {
  let zod_shape: ZodRawShape;
  if (zod_schema instanceof ZodEffects) {
    zod_shape = zod_schema._def.schema.shape;
    return zod_shape;
  } else if (zod_schema instanceof ZodObject) {
    zod_shape = zod_schema.shape;
    return zod_shape;
  }
}

export function validateData(
  form_data: FormData,
  zod_schema: ZodObject<ZodRawShape> | ZodEffects<ZodObject<ZodRawShape>>,
) {
  // get shape if ZodObject or ZodEffects
  let zod_shape: ZodRawShape;
  if (zod_schema instanceof ZodEffects) {
    zod_shape = zod_schema._def.schema.shape;
  } else if (zod_schema instanceof ZodObject) {
    zod_shape = zod_schema.shape;
  } else {
    throw new Error(
      "Typescript this is safe if there is no zodeffect / zodobject passed in, then the user did something wrong - I'm literally covering all the cases gahh",
    );
  }

  // get form entry names
  const form_entry_names: string[] = [];
  for (const entry of Object.entries(zod_shape)) {
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
