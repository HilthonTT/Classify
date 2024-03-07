import { getItems } from "@/lib/item-service";
import { SortType } from "@/types/sort";

import { ItemCard } from "./item-card";

interface ItemListProps {
  searchParams: {
    search?: string;
    sort?: SortType;
  };
}

export const ItemList = async ({ searchParams }: ItemListProps) => {
  const items = await getItems(searchParams.search, searchParams.sort);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-8 pb-10">
      {items.map((item) => (
        <ItemCard key={item.id} item={item} />
      ))}
    </div>
  );
};
