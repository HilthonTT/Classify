"use client";

import { useRouter } from "next/navigation";
import { Clock, MoreVertical, Trash2 } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAction } from "@/hooks/use-action";
import { softDeleteItem } from "@/actions/soft-delete-item";
import { toast } from "@/components/ui/use-toast";
import { ConfirmModal } from "@/components/modals/confirm-modal";
import { Button } from "@/components/ui/button";

interface ActionsProps {
  id: number;
}

export const Actions = ({ id }: ActionsProps) => {
  const router = useRouter();

  const { execute: executeSoftDelete, isLoading: isLoadingSoftDelete } =
    useAction(softDeleteItem, {
      onSuccess: (data) => {
        toast({
          title: `"${data.name}" moved to trash!`,
        });
      },
      onError: (error) => {
        toast({
          title: "Something went wrong",
          description: error,
        });
      },
    });

  const handleDelete = () => {
    executeSoftDelete({ id });
  };

  const handleHistory = () => {
    router.push(`/items/${id}/activity-history`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="opacity-0 group-hover:opacity-100 transition-opacity px-3 py-2  outline-none">
          <MoreVertical className="opacity-75 hover:opacity-100 transition h-5 w-5" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        onClick={(e) => e.stopPropagation()}
        side="right"
        sideOffset={24}
        className="w-60">
        <DropdownMenuItem
          className="p-3 cursor-pointer"
          onClick={handleHistory}>
          <Clock className="h-4 w-4 mr-2" />
          History
        </DropdownMenuItem>

        <ConfirmModal
          header="Delete item?"
          description="This will only move the item to the trash, you can recover."
          disabled={isLoadingSoftDelete}
          onConfirm={handleDelete}>
          <Button
            variant="ghost"
            className="p-3 text-sm w-full justify-start font-normal">
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </Button>
        </ConfirmModal>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
