"use client";

import qs from "query-string";
import { ArrowDown } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

type SortType = "name" | "createdAt" | "quantity" | "price";

export const SelectSort = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSortSelect = (sortValue: SortType) => {
    const url = qs.stringifyUrl({
      url: "/items",
      query: {
        sort: sortValue,
        search: searchParams.get("search"),
      },
    });

    router.push(url);
  };

  const isSelected = (value: SortType): boolean => {
    return searchParams.get("sort") === value;
  };

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
        <DropdownMenuItem
          className={cn(
            "cursor-pointer p-2 hover:text-sky-500 transition",
            isSelected("name") && "text-sky-600"
          )}
          onClick={() => handleSortSelect("name")}>
          Name
          <ArrowDown
            className={cn(
              "opacity-0",
              isSelected("name") && "stroke-sky-500 opacity-100 ml-auto"
            )}
          />
        </DropdownMenuItem>
        <DropdownMenuItem
          className={cn(
            "cursor-pointer p-2 hover:text-sky-500 transition",
            isSelected("createdAt") && "text-sky-600"
          )}
          onClick={() => handleSortSelect("createdAt")}>
          Created at
          <ArrowDown
            className={cn(
              "opacity-0",
              isSelected("createdAt") && "stroke-sky-500 opacity-100 ml-auto"
            )}
          />
        </DropdownMenuItem>
        <DropdownMenuItem
          className={cn(
            "cursor-pointer p-2 hover:text-sky-500 transition",
            isSelected("quantity") && "text-sky-600"
          )}
          onClick={() => handleSortSelect("quantity")}>
          Quantity
          <ArrowDown
            className={cn(
              "opacity-0 ",
              isSelected("quantity") && "stroke-sky-500 opacity-100 ml-auto"
            )}
          />
        </DropdownMenuItem>

        <DropdownMenuItem
          className={cn(
            "cursor-pointer p-2 hover:text-sky-500 transition",
            isSelected("price") && "text-sky-600"
          )}
          onClick={() => handleSortSelect("price")}>
          Price
          <ArrowDown
            className={cn(
              "opacity-0",
              isSelected("price") && "stroke-sky-500 opacity-100 ml-auto"
            )}
          />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
