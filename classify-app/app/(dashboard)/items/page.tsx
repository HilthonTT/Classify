import { Header } from "./_components/header";
import { ItemList } from "./_components/items-list";
import { Summary } from "./_components/summary";

const ItemsPage = () => {
  return (
    <div className="p-7 h-full w-full">
      <Header />
      <Summary />
      <ItemList />
    </div>
  );
};

export default ItemsPage;
