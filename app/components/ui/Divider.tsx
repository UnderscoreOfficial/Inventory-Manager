import { twMerge } from "tailwind-merge";

type Props = {
  className?: string;
};

export default function Divider({ className }: Props) {
  return (
    <div
      className={twMerge(
        "bg-primary-2 h-[1px] w-full transition-colors",
        className,
      )}
    ></div>
  );
}
