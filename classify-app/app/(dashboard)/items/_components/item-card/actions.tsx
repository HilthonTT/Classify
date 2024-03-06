"use client";

import { Clock, MoreVertical, Trash2 } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const Actions = () => {
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
        <DropdownMenuItem className="p-3 cursor-pointer">
          <Clock className="h-4 w-4 mr-2" />
          History
        </DropdownMenuItem>
        <DropdownMenuItem className="p-3 cursor-pointer">
          <Trash2 className="h-4 w-4 mr-2" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
