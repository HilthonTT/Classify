"use client";

import Image from "next/image";
import { Clock8, File } from "lucide-react";

import { Item } from "@/types/item";
import { Button } from "@/components/ui/button";
import { useAction } from "@/hooks/use-action";
import { updateItem } from "@/actions/update-item";
import { toast } from "@/components/ui/use-toast";

interface ItemCardProps {
  item: Item;
}

export const ItemCard = ({ item }: ItemCardProps) => {
  const { execute, isLoading } = useAction(updateItem, {
    onSuccess: (data) => {
      toast({
        title: `"${data.name}" has been restored!`,
      });
    },
    onError: (error) => {
      toast({
        title: "Something went wrong",
        description: error,
      });
    },
  });

  const handleRestore = () => {
    execute({
      id: item.id,
      quantity: item.quantity,
      minimumLevel: item.minimumLevel,
      deleted: false,
    });
  };

  return (
    <div className="group rounded-xl bg-neutral-100 w-full overflow-hidden p-1 flex">
      {item.imageUrl && (
        <div className="relative w-24 h-24">
          <Image
            src={item.imageUrl}
            alt="Image"
            className="object-fit rounded-xl rounded-r-none"
            fill
          />
        </div>
      )}
      {!item.imageUrl && (
        <div className="w-24 h-24">
          <File className="h-full w-full p-5  bg-zinc-300 rounded-xl rounded-r-none" />
        </div>
      )}
      <div className="ml-5 flex flex-col space-y-2 mt-2">
        <p className="text-lg font-bold">{item.name}</p>
      </div>
      <div className="ml-auto mt-auto opacity-0 group-hover:opacity-100 transition">
        <Button onClick={handleRestore} variant="ghost" disabled={isLoading}>
          <Clock8 className="h-5 w-5 mr-2" />
          Restore
        </Button>
      </div>
    </div>
  );
};
