import { Link } from "react-router";
import Divider from "../ui/Divider";
import Button from "../ui/Button";
import { useState } from "react";

type Props = {
  items?: { item: string; url: string; svg: React.ReactNode }[];
  title?: string;
};

export default function Sidebar({ items, title }: Props) {
  const [is_open, setIsOpen] = useState(true);

  return (
    <div
      className="bg-primary-alt-1 border-primary-2 flex h-lvh flex-col gap-2
        border-r-2 p-4 text-lg text-nowrap transition-colors duration-300"
    >
      <div className={`flex items-center ${is_open && "gap-8"}`}>
        <div className="flex gap-2">
          {is_open && (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                className="fill-opposing-1 w-6"
              >
                <path d="M408 96H252.11a23.9 23.9 0 0 1-13.31-4L211 73.41A55.77 55.77 0 0 0 179.89 64H104a56.06 56.06 0 0 0-56 56v24h416c0-30.88-25.12-48-56-48m15.75 352H88.25a56 56 0 0 1-55.93-55.15L16.18 228.11v-.28A48 48 0 0 1 64 176h384.1a48 48 0 0 1 47.8 51.83v.28l-16.22 164.74A56 56 0 0 1 423.75 448m56.15-221.45"></path>
              </svg>
              <h1 className="text-2xl">{title}</h1>
            </>
          )}
        </div>
        <Button
          className="hover:bg-opposing-1 active:fill-opposing-2 fill-opposing-1
            border-none bg-transparent transition-none hover:outline-2"
          onClick={() => setIsOpen(!is_open)}
        >
          {is_open ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              className="w-5 scale-125"
            >
              <path
                fillRule="evenodd"
                d="M15 3.25a.75.75 0 0 0-.75-.75H1.75a.75.75 0 0 0 0 1.5h12.5a.75.75 0 0 0 .75-.75M15 8a.75.75 0 0 0-.75-.75h-8.5a.75.75 0 0 0 0 1.5h8.5A.75.75 0 0 0 15 8m-.75 4a.75.75 0 0 1 0 1.5h-2.5a.75.75 0 0 1 0-1.5z"
                clipRule="evenodd"
              ></path>
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              className="w-5 scale-125"
            >
              <path
                fillRule="evenodd"
                d="M1.25 3.25A.75.75 0 0 1 2 2.5h12A.75.75 0 0 1 14 4H2a.75.75 0 0 1-.75-.75m0 4.75A.75.75 0 0 1 2 7.25h12a.75.75 0 0 1 0 1.5H2A.75.75 0 0 1 1.25 8M2 12a.75.75 0 0 0 0 1.5h12a.75.75 0 0 0 0-1.5z"
                clipRule="evenodd"
              ></path>
            </svg>
          )}
        </Button>
      </div>
      <Divider className="mt-2 mb-2 h-[2px]" />
      <ul
        className={`text-opposing-2 flex w-full flex-col gap-4 ${ !is_open &&
          "items-center" }`}
      >
        {items?.map((i) => (
          <li
            key={i.item}
            className="active:text-opposing-2 active:fill-opposing-2
              hover:bg-opposing-1 hover:text-primary-2 hover:outline-primary-3
              fill-opposing-2 hover:fill-accent-1 w-full cursor-grab rounded-md
              hover:outline-2"
          >
            <Link to={i.url} className="inline-block w-full p-2">
              <div className="flex items-center gap-2">
                <span className="inline-block w-6">{i.svg}</span>
                {is_open && i.item}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
