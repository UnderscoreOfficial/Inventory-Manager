import { twMerge } from "tailwind-merge";

type Props = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "className" | "children"
> & {
  className?: string;
  children?: React.ReactNode;
  props?: unknown;
};

export default function Button({ className, children, ...props }: Props) {
  // default styling
  return (
    <button
      className={twMerge(
        `hover:border-primary-3 hover:text-primary-3 hover:fill-accent-1
        active:text-opposing-2 active:fill-opposing-2 bg-opposing-1
        text-primary-2 fill-primary-2 border-outline-1 cursor-grab rounded-md
        border-2 p-2`,
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
