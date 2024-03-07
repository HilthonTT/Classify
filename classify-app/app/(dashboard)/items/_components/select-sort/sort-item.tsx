"use client";

import qs from "query-string";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowDown } from "lucide-react";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { SortType } from "@/types/sort";

interface SortItemProps {
  name: SortType;
}

const sortTypeMap: Record<SortType, string> = {
  name: "Name",
  createdAt: "Created At",
  quantity: "Quantity",
  price: "Price",
};

export const SortItem = ({ name }: SortItemProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const isSelected = searchParams.get("sort") === name;

  const onClick = () => {
    const url = qs.stringifyUrl({
      url: "/items",
      query: {
        sort: name,
        search: searchParams.get("search"),
      },
    });

    router.push(url);
  };

  return (
    <DropdownMenuItem className="group cursor-pointer" onClick={onClick}>
      <span
        className={cn(
          "group-hover:text-sky-500",
          isSelected && "text-sky-600"
        )}>
        {sortTypeMap[name]}
      </span>
      <ArrowDown
        className={cn(
          "opacity-0",
          isSelected && "stroke-sky-500 opacity-100 ml-auto"
        )}
      />
    </DropdownMenuItem>
  );
};
