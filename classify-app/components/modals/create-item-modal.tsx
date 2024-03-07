"use client";

import { useCreateItemModal } from "@/store/use-create-item-modal";
import { useState } from "react";

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
import { Button } from "@/components/ui/button";
import { ImageUpload } from "@/components/image-upload";
import { useAction } from "@/hooks/use-action";
import { createItem } from "@/actions/create-item";
import { FormInput } from "@/components/form/form-input";
import { FormSubmit } from "@/components/form/form-submit";

export const CreateItemModal = () => {
  const { isOpen, onClose } = useCreateItemModal();

  const { execute, fieldErrors, isLoading } = useAction(createItem, {
    onSuccess: (item) => {
      toast({
        title: `Created item "${item.name}"`,
      });
      handleClose();
    },
    onError: (error) => {
      toast({
        title: "Something went wrong!",
        description: error,
      });
      handleClose();
    },
  });

  const [imageUrl, setImageUrl] = useState<string>("");

  const onChange = (url: string) => {
    setImageUrl(url);
  };

  const handleClose = () => {
    setImageUrl("");

    onClose();
  };

  const handleSubmit = (formData: FormData) => {
    const name = formData.get("name") as string;

    const quantity = Number(formData.get("quantity"));
    const minimumLevel = Number(formData.get("minimumLevel"));
    const price = Number(formData.get("price"));

    execute({ name, quantity, minimumLevel, price, imageUrl });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-full">
        <DialogHeader>
          <DialogTitle>Add Item</DialogTitle>
        </DialogHeader>
        <DialogDescription>Add an item to your organization</DialogDescription>

        <form action={handleSubmit} className="flex-1 flex-col space-y-2">
          <FormInput
            id="name"
            placeholder="Name"
            label="Name"
            disabled={isLoading}
            errors={fieldErrors}
            required
          />
          <div className="flex items-center justify-between">
            <FormInput
              id="quantity"
              placeholder="Quantity"
              label="Quantity"
              type="number"
              disabled={isLoading}
              errors={fieldErrors}
            />
            <FormInput
              id="minimumLevel"
              placeholder="Min Level"
              label="Minimum Level"
              type="number"
              disabled={isLoading}
              errors={fieldErrors}
            />
          </div>
          <FormInput
            id="price"
            placeholder="Price"
            label="Price &euro;"
            type="number"
            disabled={isLoading}
            errors={fieldErrors}
          />
          <div className="flex items-center justify-center">
            <ImageUpload id="imageUrl" onChange={onChange} value={imageUrl} />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <FormSubmit disabled={isLoading}>Add Item</FormSubmit>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
