"use client";

import qs from "query-string";
import { useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { useDebounceValue } from "usehooks-ts";
import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";

export const SearchInput = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [value, setValue] = useState<string>("");
  const [debouncedValue] = useDebounceValue(value, 250);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    const url = qs.stringifyUrl(
      {
        url: "/items",
        query: {
          search: debouncedValue,
          sort: searchParams.get("sort"),
        },
      },
      {
        skipEmptyString: true,
        skipNull: true,
      }
    );

    router.push(url);
  }, [debouncedValue, router]);

  return (
    <div className="w-auto relative">
      <Search className="absolute top-1/2 left-3 transform -translate-y-1/2 text-muted-foreground h-6 w-6" />
      <Input
        className="w-full max-w-[300px] pl-10 capitalize"
        placeholder="Search all items"
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};
