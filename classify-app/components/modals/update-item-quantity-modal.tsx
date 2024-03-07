"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Minus, Plus } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useUpdateQuantityItemModal } from "@/store/use-update-item-quantity-modal";
import { TabSeparator } from "@/components/tab-separator";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/form/form-input";
import { FormTextarea } from "@/components/form/form-textarea";
import { FormSubmit } from "@/components/form/form-submit";
import { useAction } from "@/hooks/use-action";
import { updateItem } from "@/actions/update-item";
import { toast } from "@/components/ui/use-toast";

export const UpdateItemQuantityModal = () => {
  const { isOpen, onClose, item } = useUpdateQuantityItemModal();

  const [quantity, setQuantity] = useState<number>(item?.quantity || 0);

  const { execute, isLoading } = useAction(updateItem, {
    onSuccess: (data) => {
      toast({
        title: `Updated quantity of ${data.name}!`,
      });
      onClose();
    },
    onError: (error) => {
      toast({
        title: "Something went wrong!",
        description: error,
      });
      onClose();
    },
  });

  const handleAdd = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleMinus = () => {
    if (quantity <= 0) {
      setQuantity(0);
    } else {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleSubmit = (formData: FormData) => {
    if (!item) {
      return;
    }

    const quantity = Number(formData.get("quantity"));
    const reason = formData.get("reason") as string;

    execute({ id: item.id, quantity, minimumLevel: item.minimumLevel, reason });
  };

  useEffect(() => {
    if (item) {
      setQuantity(item.quantity);
    }
  }, [item]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="overflow-hidden">
        <DialogHeader>
          <DialogTitle>Update Quantity</DialogTitle>
        </DialogHeader>
        <div className="flex items-start gap-2">
          <div className="relative h-20 w-20">
            {item?.imageUrl && (
              <Image
                src={item?.imageUrl}
                alt="Image"
                className="object-cover rounded-md"
                fill
              />
            )}
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-lg truncate">{item?.name}</span>
            <div className="flex items-center text-sm ">
              <span className="font-semibold truncate">
                {item?.quantity} units
              </span>
              <TabSeparator />
              <span className="font-semibold truncate text-muted-foreground">
                {item?.price} &euro;
              </span>
            </div>
          </div>
        </div>
        <Separator />

        <form action={handleSubmit} className="w-full p-1">
          <div className="flex items-center justify-between">
            <Button
              onClick={handleMinus}
              type="button"
              variant="ghost"
              size="icon"
              className="border border-neutral-200"
              disabled={isLoading}>
              <Minus />
            </Button>
            <div className="flex flex-col items-center">
              <FormInput
                id="quantity"
                className="w-full"
                placeholder="Quantity"
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                disabled={isLoading}
                required
              />
            </div>

            <Button
              onClick={handleAdd}
              type="button"
              variant="ghost"
              size="icon"
              className="border border-neutral-200"
              disabled={isLoading}>
              <Plus />
            </Button>
          </div>
          <Separator className="my-4" />

          <FormTextarea
            id="reason"
            placeholder="Add a note (optional)"
            disabled={isLoading}
          />
          <FormSubmit
            className="bg-blue-500 hover:bg-blue-400 ml-auto mt-4"
            disabled={isLoading}>
            Update
          </FormSubmit>
        </form>
      </DialogContent>
    </Dialog>
  );
};
