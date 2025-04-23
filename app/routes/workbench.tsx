import { useEffect, useState } from "react";
import { type MetaFunction } from "react-router";
import Button from "~/components/ui/Button";
import Divider from "~/components/ui/Divider";
import Input from "~/components/ui/Input";
import Modal from "~/components/ui/Modal";

export const meta: MetaFunction = () => {
  return [
    { title: "Inventory Manager - Workbench" },

    {
      name: "description",
      content: `UI Primitive & Color Scheme testing area.`,
    },
  ];
};
export default function Workbench() {
  const [modal_open, setModalOpen] = useState(false);

  // get current theme from html (not how I will handle getting the theme just to show it can be grabbed)
  // temp gonna use db for state but needed for testing
  const [theme, setTheme] = useState<string>("unknown");

  // holy crap there has to be a better way of doing client only stuff without just throwing the whole comp in a .client module
  let data_theme = "unknown";
  try {
    data_theme = String(
      document.querySelector("html")?.getAttribute("data-theme"),
    );
  } catch {
    void 0;
  }

  useEffect(() => {
    setTheme(data_theme);
  }, [data_theme]);

  function handleClick() {
    if (theme == "light") {
      document.querySelector("html")?.setAttribute("data-theme", "dark");
      setTheme("dark");
    } else {
      document.querySelector("html")?.setAttribute("data-theme", "light");
      setTheme("light");
    }
  }

  return (
    <div className="flex w-full flex-col items-center gap-6 p-4">
      <div className="flex w-full flex-row items-center justify-end gap-4">
        <section className="text-primary-2">Current Theme</section>
        <Button className="" onClick={() => handleClick()}>
          {theme}
        </Button>
      </div>
      <h1 className="text-center">Primitive UI Components</h1>
      <div className="flex justify-center">
        <Button>This is a button</Button>
        <Button onClick={() => setModalOpen(true)}>Modal</Button>
        <Modal is_open={modal_open} setIsOpen={setModalOpen} title="Modal">
          <div>This is the modal info ?????</div>
        </Modal>
      </div>
      <form target="/" className="flex flex-col gap-4">
        <Input placeholder="text" min={1} />
        <Input
          placeholder="number"
          type="number"
          max={10}
          min={1}
          defaultValue={5}
        />
        <Button type="submit">Submit</Button>
      </form>
      <Divider className="w-1/3" />
      <h2 className="">Colors</h2>
      <div className="flex flex-row flex-wrap justify-center gap-2">
        <span className="text-primary-1 bg-primary-2">Primary-1</span>
        <span className="text-primary-2">Primary-2</span>
        <span className="text-primary-3">Primary-3</span>
        <span className="text-primary-2">|</span>
        <span className="text-opposing-1">Opposing-1</span>
        <span className="text-opposing-2">Opposing-2</span>
        <span className="text-primary-2">|</span>
        <span className="text-outline-1">Outline-1</span>
        <span className="text-outline-2">Outline-2</span>
      </div>
    </div>
  );
}
