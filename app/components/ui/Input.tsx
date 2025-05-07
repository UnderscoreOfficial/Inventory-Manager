import { Field, NumberInput, PinInput } from "@ark-ui/react";
import { twMerge } from "tailwind-merge";
import { range } from "~/utils";

// straying slightly from html standard reasoning is the input fundementially dosent make sense
// sure everything is an input but its changing it type at a ui and accessibility level that no other
// html elements type does so Input will just be focused on basic text/number input anything more complex
// will be its own element such as date, color, radios & checkboxes

// Valid Types

// "number"
// "text"
// "hidden"
// "tel"
// "email"
// "password"
// "url"
// "search"
// "pin"

// Implemented Types
type InputTypeProp =
  | "number"
  | "pin"
  | "text"
  | "hidden"
  | "email"
  | "password"
  | "search";

type Props = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "className" | "type" | "checked" | "min" | "max"
> & {
  min?: number;
  max?: number;
  type?: InputTypeProp;
  label?: string;
  error?: string;
  className?: string;
  props?: unknown;
};

export default function Input({
  min,
  max,
  type = "text",
  form,
  label,
  error,
  className,
  ...props
}: Props) {
  return (
    // field type for text based inputs
    <Field.Root className="flex flex-col gap-1">
      {label && <Field.Label>{label}</Field.Label>}
      {type == "number" ? (
        <NumberInput.Root className="relative">
          <NumberInput.Input
            className={twMerge(
              `bg-primary-2 outline-primary-alt-1 focus:outline-accent-1
                rounded-md p-2 outline-2`,
              className,
            )}
            min={min}
            max={max}
            {...props}
          />
          <NumberInput.Control
            className="pointer-events-none absolute top-0 right-0 bottom-0
              left-0 overflow-hidden"
          >
            <NumberInput.IncrementTrigger
              className="fill-primary-3 hover:fill-opposing-2
                pointer-events-auto absolute top-0 right-0 h-5 w-8
                overflow-hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="absolute top-[-17px] left-[-12px] w-14
                  border-blue-200"
              >
                <path d="m7 14l5-5l5 5z"></path>
              </svg>
            </NumberInput.IncrementTrigger>
            <NumberInput.DecrementTrigger
              className="fill-primary-3 hover:fill-opposing-2
                pointer-events-auto absolute right-0 bottom-0 h-5 w-8
                overflow-hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="absolute bottom-[-17px] left-[-12px] w-14"
              >
                <path d="m7 10l5 5l5-5z"></path>
              </svg>
            </NumberInput.DecrementTrigger>
          </NumberInput.Control>
        </NumberInput.Root>
      ) : // yeah the pin input could be better not as flexible as id want but gotta finish this project at somepoint
      type == "pin" ? (
        // as a strong don't use any / avoid as advocate myself its hard to find a reason not to use any here
        // PinInput dosent follow a 1:1 of the HTMLInputElement props but it still has a crap ton of props
        // avaliable. I don't actually lose typing on the Input comp in fact its still in line with html way of
        // doing things where inputs will take props but only valid props will work the rest silently fail if
        // passed. The final reason is I'm never actually interfacing with this type its almost the only edge
        // case where any has no effect on the types since html ignores the errors & typing literally does
        // not matter since this is within the arkui library id never be interfacing with the casted types
        <PinInput.Root {...(props as any)} otp>
          <PinInput.Control className="flex items-center gap-2">
            {[...range(0, max ? max : 3)].map((id, index) => (
              <div key={id} className="flex items-center gap-2">
                {id % 3 == 0 && id > 0 && (
                  <span key={`dash-${id}`} className="font-bold">
                    -
                  </span>
                )}
                <PinInput.Input
                  key={`input-${id}`}
                  index={index}
                  className={twMerge(
                    `bg-primary-2 outline-primary-alt-1 focus:outline-accent-1
                      h-10 w-10 rounded text-center outline-2`,
                    className,
                  )}
                />
              </div>
            ))}
          </PinInput.Control>
          <PinInput.HiddenInput />
        </PinInput.Root>
      ) : (
        <Field.Input
          className={twMerge(
            `bg-primary-2 outline-primary-alt-1 focus:outline-accent-1
              rounded-md p-2 outline-2`,
            className,
          )}
          min={min}
          max={max}
          type={type}
          {...props}
        />
      )}
      {error && <span className="text-error-1 font-bold">{error}</span>}
    </Field.Root>
  );
}
