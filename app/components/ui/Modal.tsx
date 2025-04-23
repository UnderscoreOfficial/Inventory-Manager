import { Dialog } from "@ark-ui/react/dialog";
import { Portal } from "@ark-ui/react/portal";
import { type ReactNode } from "react";
import Button from "./Button";

type Props = {
  children?: ReactNode;
  title?: string;
  is_open: boolean;
  setIsOpen(state: boolean): void;
};

export default function Modal({ is_open, setIsOpen, title, children }: Props) {
  return (
    <>
      {is_open && <div></div>}
      <Dialog.Root open={is_open} onOpenChange={(e) => setIsOpen(e.open)}>
        {is_open && (
          <div
            className="fixed top-0 right-0 bottom-0 left-0 z-0
              backdrop-blur-[4px]"
          ></div>
        )}
        <Portal>
          <Dialog.Backdrop>
            <div
              className="fixed top-0 right-0 bottom-0 left-0 bg-neutral-950/75"
            ></div>
          </Dialog.Backdrop>
          <Dialog.Positioner
            className="absolute top-0 right-0 bottom-0 left-0 flex w-full
              items-center justify-center"
          >
            <Dialog.Content
              className="border-outline-2 bg-primary-2 z-10 flex flex-col
                justify-start gap-2 rounded-md border-2 p-2"
            >
              <div className="flex items-center justify-between">
                <Dialog.Title className="underline underline-offset-8">
                  {title}
                </Dialog.Title>
                <Dialog.CloseTrigger className="w-fit" asChild={true}>
                  <Button>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 384 512"
                      className="text-primary-1 w-2 scale-150"
                    >
                      <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                    </svg>
                  </Button>
                </Dialog.CloseTrigger>
              </div>
              {children}
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </>
  );
}
