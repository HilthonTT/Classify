"use client";

import { useCreateItemModal } from "@/store/use-create-item-modal";
import { FormEventHandler, useState } from "react";

import { toast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ImageUpload } from "@/components/image-upload";
import { createItem } from "@/actions/item";

export const CreateItemModal = () => {
  const { isOpen, onClose } = useCreateItemModal();

  const [name, setName] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [minLevel, setMinLevel] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);

  const onChange = (url: string) => {
    setImageUrl(url);
  };

  const close = () => {
    setName("");
    setImageUrl("");
    setQuantity(0);
    setMinLevel(0);
    setPrice(0);

    onClose();
  };

  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    await createItem({
      name,
      imageUrl,
      quantity,
      minimumLevel: minLevel,
      price,
    })
      .then((item) => {
        toast({
          title: `${item.name} Created!`,
          description: "Item has been successfully created!",
        });
      })
      .catch(() => {
        toast({
          title: "Something went wrong!",
          description: "Something happened on our side. Please try again.",
        });
      })
      .finally(() => {
        close();
      });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-full">
        <DialogHeader>
          <DialogTitle>Add Item</DialogTitle>
        </DialogHeader>
        <DialogDescription>Add an item to your organization</DialogDescription>
        <form onSubmit={onSubmit} className="space-y-2">
          <div className="space-y-1">
            <Label className="text-muted-foreground">Name</Label>
            <Input
              required
              disabled={false}
              maxLength={60}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              type="text"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label className="text-muted-foreground">Quantity</Label>
              <Input
                disabled={false}
                min={0}
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                placeholder="Quantity"
                type="number"
              />
            </div>

            <div className="space-y-1">
              <Label className="text-muted-foreground">Minimum Level</Label>
              <Input
                disabled={false}
                maxLength={60}
                value={minLevel}
                onChange={(e) => setMinLevel(Number(e.target.value))}
                placeholder="Min Level"
                type="number"
              />
            </div>
          </div>
          <div className="space-y-1 w-[43%]">
            <Label className="text-muted-foreground">Price &euro;</Label>
            <Input
              disabled={false}
              min={0}
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              placeholder="Price"
              type="number"
            />
          </div>
          <div className="flex items-center justify-center">
            <ImageUpload value={imageUrl} onChange={onChange} />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" variant="primary">
              Add Item
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
