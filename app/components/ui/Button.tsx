import { Link } from "react-router";
import { twMerge } from "tailwind-merge";

// Valid Types

// "button"
// "submit"
// "reset"
// "link"

// Implemented Types
type ButtonTypeProp = "button" | "submit" | "reset" | "link";

type Props = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "className" | "children" | "type"
> & {
  className?: string;
  children?: React.ReactNode;
  props?: unknown;
  type?: ButtonTypeProp;
  to?: string;
};

// <button
//   className={twMerge(
//     `hover:border-primary-3 hover:text-primary-3 hover:fill-accent-1
//     active:text-opposing-2 active:fill-opposing-2 bg-opposing-1
//     text-primary-2 fill-primary-2 border-outline-1 cursor-grab rounded-md
//     border-2 p-2`,
//     className,
//   )}
//   {...props}
// >
//   {children}
// </button>

export default function Button({
  className,
  children,
  type,
  to,
  ...props
}: Props) {
  // default styling
  return (
    <>
      {type == "link" ? (
        <Link
          to={to || ""}
          className={twMerge(
            `hover:border-primary-3 hover:text-primary-3 hover:fill-accent-1
              active:text-opposing-2 active:fill-opposing-2 bg-opposing-1
              text-primary-2 fill-primary-2 border-outline-1 cursor-grab
              rounded-md border-2 p-2 text-center`,
            className,
          )}
          // clarified in input.tsx ui comp why this is fine short is dosent hurt typing because html
          {...(props as any)}
        >
          {children}
        </Link>
      ) : (
        <button
          className={twMerge(
            `hover:border-primary-3 hover:text-primary-3 hover:fill-accent-1
              active:text-opposing-2 active:fill-opposing-2 bg-opposing-1
              text-primary-2 fill-primary-2 border-outline-1 cursor-grab
              rounded-md border-2 p-2 text-center`,
            className,
          )}
          {...props}
        >
          {children}
        </button>
      )}
    </>
  );
}
