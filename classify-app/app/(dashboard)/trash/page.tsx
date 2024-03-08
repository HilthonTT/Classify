import { getDeletedItems } from "@/lib/item-service";

import { Header } from "./_components/header";
import { Summary } from "./_components/summary";
import { ItemList } from "./_components/item-list";

const TrashPage = async () => {
  const items = await getDeletedItems();

  return (
    <div className="h-full p-7">
      <Header />
      <Summary items={items} />
      <ItemList items={items} />
    </div>
  );
};

export default TrashPage;
