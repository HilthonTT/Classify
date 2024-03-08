"use client";

import Image from "next/image";

import { Button } from "@/components/ui/button";
import { useCreateItemModal } from "@/store/use-create-item-modal";

export const EmptyItems = () => {
  const { onOpen } = useCreateItemModal();

  const onClick = () => {
    onOpen();
  };

  return (
    <div className="h-full flex flex-col items-center justify-center">
      <Image
        src="/computer.jpg"
        alt="No Organization"
        className="object-cover rounded-full grayscale"
        width={300}
        height={300}
      />
      <h2 className="text-2xl font-semibold mt-6">No items found!</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Make an item for your organization.
      </p>
      <div className="mt-6">
        <Button onClick={onClick} variant="primary">
          Create Item
        </Button>
      </div>
    </div>
  );
};
