import { getItems } from "@/lib/item-service";
import { getFolders } from "@/lib/folder-service";
import { getSummary } from "@/lib/summary-service";
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
  const [items, folders, summary] = await Promise.all([
    getItems(searchParams.search, searchParams.sort),
    getFolders(searchParams.search),
    getSummary(),
  ]);

  return (
    <div className="p-7 h-full w-full">
      <Header />
      <Summary summary={summary} />
      <ItemList items={items} folders={folders} />
    </div>
  );
};

export default ItemsPage;
