"use client";

import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";

import { Hint } from "@/components/hint";

interface FolderActionsProp {
  id: number;
}

export const FolderActions = ({ id }: FolderActionsProp) => {
  const router = useRouter();

  return (
    <div className="absolute right-2 bottom-3 transform  opacity-0 group-hover:opacity-100 transition-opacity">
      <div className="flex flex-col space-y-2">
        <Hint label="Edit" side="left" align="start" alignOffset={-9}>
          <button
            onClick={() => router.push(`/folder/${id}`)}
            className="rounded-lg bg-gray-600 hover:bg-gray-500 transition p-1">
            <Pencil className="stroke-white" />
          </button>
        </Hint>
      </div>
    </div>
  );
};
