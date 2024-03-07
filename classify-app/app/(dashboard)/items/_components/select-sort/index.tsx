"use client";

import { ArrowDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { SortItem } from "./sort-item";

export const SelectSort = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">
          Name
          <ArrowDown className="ml-2 h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-40"
        side="bottom"
        align="start"
        alignOffset={-50}>
        <SortItem name="name" />
        <SortItem name="createdAt" />
        <SortItem name="quantity" />
        <SortItem name="price" />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
