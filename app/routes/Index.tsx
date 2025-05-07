import { type MetaFunction } from "react-router";

export const meta: MetaFunction = () => {
  return [
    { title: "Inventory Manager - Manage inventory of items or products" },

    {
      name: "description",
      content: `This is a small but feature packed inventory managment solution, create account, access control, dash board, rich statistics and analistics of inventory, Track any thing with
        custom tags and specifics of whatever you want to track all of this can be used as statistics to gain further insight on your inventory from daily / weekly stats like incoming inventory
        to growth over time and averages or median costs or ammounts of inventory.
      `,
    },
  ];
};

export default function Index() {
  return (
    <div
      className="flex w-full flex-col items-center justify-center gap-4 text-xl"
    >
      <h1 className="text-center">
        Welcome to the inventory manager! - Dashboard
      </h1>
    </div>
  );
}
