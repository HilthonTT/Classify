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

const ItemsPage = ({ searchParams }: ItemsPageProps) => {
  return (
    <div className="p-7 h-full w-full">
      <Header />
      <Summary />
      <ItemList searchParams={searchParams} />
    </div>
  );
};

export default ItemsPage;
