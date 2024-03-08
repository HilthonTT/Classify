"use client";

import { Header } from "./_components/header";
import { ItemList } from "./_components/item-list";
import { Summary } from "./_components/summary";

const Loading = () => {
  return (
    <div className="h-full p-7">
      <Header.Skeleton />
      <Summary.Skeleton />
      <ItemList.Skeleton />
    </div>
  );
};

export default Loading;
