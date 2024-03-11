"use client";

import { useOrganization } from "@clerk/nextjs";

import { Item } from "@/types/item";
import { EmptyOrg } from "@/components/empty-org";
import { Folder } from "@/types/folder";

import { ItemCard } from "@/components/item-card";
import { EmptyItems } from "./empty-items";
import { FolderCard } from "./folder-card";

interface ItemListProps {
  items: Item[];
  folders: Folder[];
}

export const ItemList = ({ items, folders }: ItemListProps) => {
  const { organization } = useOrganization();

  if (!organization) {
    return <EmptyOrg />;
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-8 pb-10">
        {folders.map((folder) => (
          <FolderCard key={folder.id} folder={folder} />
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-8 pb-10">
        {items.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>
      {items.length === 0 && folders.length === 0 && <EmptyItems />}
    </>
  );
};

ItemList.Skeleton = function ItemListSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-8 pb-10">
      {[...Array(5)].map((_, i) => (
        <ItemCard.Skeleton key={i} />
      ))}
    </div>
  );
};
