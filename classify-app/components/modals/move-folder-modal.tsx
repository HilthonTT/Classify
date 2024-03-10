"use client";

import qs from "query-string";
import { useEffect, useState } from "react";
import { FolderIcon, Loader2, PackagePlus, Search } from "lucide-react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useMoveFolderModal } from "@/store/use-move-folder-modal";
import { Separator } from "@/components/ui/separator";
import { FormInput } from "@/components/form/form-input";
import { Folder } from "@/types/folder";
import { fetcher } from "@/lib/fetcher";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { FormSubmit } from "@/components/form/form-submit";
import { useAction } from "@/hooks/use-action";
import { moveFolder } from "@/actions/move-folder";
import { toast } from "@/components/ui/use-toast";

export const MoveFolderModal = () => {
  const { isOpen, onClose, item } = useMoveFolderModal();

  const [value, setValue] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [folders, setFolders] = useState<Folder[]>([]);
  const [folderId, setFolderId] = useState<number | undefined>(undefined);

  const {
    execute,
    isLoading: moveFolderLoading,
    fieldErrors,
  } = useAction(moveFolder, {
    onSuccess: (data) => {
      toast({
        title: `"${data.name}" moved to folder "${
          folders.find((f) => f.id === data.folderId)?.name
        }"`,
      });

      onClose();
    },
    onError: (error) => {
      toast({
        title: "Something went wrong",
        description: error,
      });

      onClose();
    },
  });

  const onFolderClick = (id: number) => {
    if (moveFolderLoading || isLoading) {
      return;
    }

    if (folderId == id) {
      setFolderId(undefined);
    } else {
      setFolderId(id);
    }
  };

  const handleSubmit = (formData: FormData) => {
    if (!folderId || !item) {
      return;
    }

    const notes = formData.get("notes") as string | undefined;

    execute({ folderId, itemId: item.id, notes });
  };

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const url = qs.stringifyUrl(
          {
            url: "/api/folders",
            query: {
              search: value,
            },
          },
          {
            skipEmptyString: true,
            skipNull: true,
          }
        );

        const result = (await fetcher(url)) as Folder[];

        setFolders(result);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTags();
  }, [value]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="overflow-hidden text-zinc-700">
        <DialogHeader>
          <DialogTitle className="font-medium flex items-center">
            <PackagePlus className="h-6 w-6 mr-2" />
            Move Item
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col items-start justify-center">
          <span className="font-semibold text-lg">{item?.name}</span>
        </div>
        <Separator />
        <form action={handleSubmit}>
          <FormInput
            id="notes"
            placeholder="Reason"
            label="Move notes"
            errors={fieldErrors}
          />
          <Separator className="my-4" />
          <div className="space-y-2">
            <span className="text-sm font-extralight">
              Choose destination folder
            </span>
            <div className="relative mb-4">
              <Search className="absolute top-1/2 left-3 transform -translate-y-1/2 text-muted-foreground h-6 w-6" />
              <Input
                className="w-full pl-10"
                placeholder="Search folders"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
            </div>
            {isLoading && (
              <div className="flex items-center justify-center mt-4">
                <Loader2 className="h-7 w-7 animate-spin" />
              </div>
            )}
            <ScrollArea className="h-[240px] w-full">
              <div className="space-y-2">
                {folders.map((folder) => (
                  <div
                    key={folder.id}
                    onClick={() => onFolderClick(folder.id)}
                    role="button"
                    className={cn(
                      "hover:bg-neutral-200/70 transition overflow-hidden p-2 rounded-lg",
                      folder.id === folderId &&
                        "bg-neutral-200/70 hover:bg-neutral-300",
                      moveFolderLoading ||
                        (isLoading && "opacity-75 cursor-not-allowed")
                    )}>
                    <div className="flex items-center justify-start">
                      <FolderIcon className=" stroke-gray-500 fill-gray-500 mr-2" />
                      <span className="text-xs font-semibold">
                        {folder.name}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>

          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button
                type="button"
                variant="outline"
                disabled={moveFolderLoading || isLoading}>
                Cancel
              </Button>
            </DialogClose>
            <FormSubmit disabled={moveFolderLoading || isLoading || !folderId}>
              Move Item
            </FormSubmit>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
