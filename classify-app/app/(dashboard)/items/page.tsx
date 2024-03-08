import { getItems } from "@/lib/item-service";
import { SortType } from "@/types/sort";

import { Header } from "./_components/header";
import { ItemList } from "./_components/items-list";
import { Summary } from "./_components/summary";

interface ItemsPageProps {
  searchParams: {
    search?: string;
    sort?: SortType;
  };
}

const ItemsPage = async ({ searchParams }: ItemsPageProps) => {
  const items = await getItems(searchParams.search, searchParams.sort);

  return (
    <div className="p-7 h-full w-full">
      <Header />
      <Summary items={items} />
      <ItemList items={items} />
    </div>
  );
};

export default ItemsPage;
