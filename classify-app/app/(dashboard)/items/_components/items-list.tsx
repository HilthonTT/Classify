import { getItems } from "@/lib/item-service";

import { ItemCard } from "./item-card";

interface ItemListProps {
  search?: string;
}

export const ItemList = async ({ search }: ItemListProps) => {
  const items = await getItems(search);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-8 pb-10">
      {items.map((item) => (
        <ItemCard key={item.id} item={item} />
      ))}
    </div>
  );
};
