"use client";

import { Header } from "./_components/header";
import { ItemList } from "./_components/items-list";
import { Summary } from "./_components/summary";

const Loading = () => {
  return (
    <div className="p-7 h-full w-full">
      <Header.Skeleton />
      <Summary.Skeleton />
      <ItemList.Skeleton />
    </div>
  );
};

export default Loading;
