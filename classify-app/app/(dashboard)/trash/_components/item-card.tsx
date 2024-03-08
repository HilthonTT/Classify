"use client";

import Image from "next/image";
import { Clock8, File } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

import { Item } from "@/types/item";
import { Button } from "@/components/ui/button";
import { useAction } from "@/hooks/use-action";
import { updateItem } from "@/actions/update-item";
import { toast } from "@/components/ui/use-toast";

interface ItemCardProps {
  item: Item;
}

const Separator = () => {
  return <div className="mx-2 border border-neutral-200 border-dashed"></div>;
};

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

  const formattedDate: string | undefined = formatDistanceToNow(
    item.dateDeleted!,
    {
      addSuffix: true,
    }
  );

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

      <div className="ml-5 flex flex-col space-y-2 mt-2 w-[50%] ">
        <p className="text-lg font-bold">{item.name}</p>
      </div>
      <Separator />
      <div className="w-[50%] mt-2">
        <span className="flex items-center space-x-1 text-sm">
          <p className="text-muted-foreground">Deleted:</p>
          <p className="font-semibold">{formattedDate}</p>
        </span>
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
