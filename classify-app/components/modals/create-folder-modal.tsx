"use client";

import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { useCreateFolderModal } from "@/store/use-create-folder-modal";
import { useAction } from "@/hooks/use-action";
import { createFolder } from "@/actions/create-folder";
import { toast } from "@/components/ui/use-toast";
import { FormInput } from "@/components/form/form-input";
import { FormTags } from "@/components/form/form-tags";
import { FormTextarea } from "@/components/form/form-textarea";

import { Button } from "@/components/ui/button";
import { FormSubmit } from "@/components/form/form-submit";

export const CreateFolderModal = () => {
  const { isOpen, onClose } = useCreateFolderModal();

  const [tagId, setTagId] = useState<string>("");

  const { execute, isLoading, fieldErrors } = useAction(createFolder, {
    onSuccess: (data) => {
      toast({
        title: `Created folder "${data.name}"`,
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

  const handleSubmit = (formData: FormData) => {
    const name = formData.get("name") as string;
    const notes = formData.get("notes") as string | undefined;

    const tag = Number(tagId);

    execute({ name, notes, tagId: tag });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-full overflow-hidden">
        <DialogHeader>
          <DialogTitle>Add Folder</DialogTitle>
        </DialogHeader>
        <DialogDescription>Add a folder to your organization</DialogDescription>

        <form action={handleSubmit} className="flex flex-1 flex-col space-y-2">
          <FormInput id="name" placeholder="Name" errors={fieldErrors} />
          <FormTags onChange={(value) => setTagId(value)} />
          <FormTextarea id="notes" placeholder="Notes" />

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <FormSubmit disabled={isLoading}>Add Folder</FormSubmit>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
