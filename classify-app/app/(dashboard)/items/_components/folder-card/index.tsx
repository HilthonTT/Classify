"use client";

import Image from "next/image";
import Link from "next/link";
import { Boxes, File } from "lucide-react";

import { Folder } from "@/types/folder";
import { TabSeparator } from "@/components/tab-separator";

import { FolderActions } from "./folder-actions";
import { Actions } from "./actions";

interface FolderCardProps {
  folder: Folder;
}

export const FolderCard = ({ folder }: FolderCardProps) => {
  const totalPrice: number = folder.items.reduce(
    (acc, curr) => acc + curr.price,
    0
  );

  return (
    <Link href={`/folder/${folder.id}/content`} className="group">
      <div className="group rounded-xl bg-gray-100 relative shadow-sm hover:shadow-lg hover:opacity-95 transition">
        <div className="relative flex w-full h-36 gap-0.5">
          {/* Left Image */}
          {folder.items.length > 0 && folder.items[0].imageUrl ? (
            <div className="relative w-1/2 h-full">
              <Image
                src={folder.items[0].imageUrl}
                alt={folder.items[0].name}
                fill
                className="object-cover rounded-tl-xl"
              />
            </div>
          ) : (
            <div className="w-1/2 h-full">
              <File className="h-full w-full p-10 bg-zinc-300 rounded-tl-xl" />
            </div>
          )}

          {/* Right Images */}
          <div className="flex flex-col w-1/2 gap-y-0.5">
            {folder.items[1] ? (
              <div className="relative h-1/2">
                {folder.items[1].imageUrl && (
                  <Image
                    src={folder.items[1].imageUrl}
                    alt={folder.items[1].name}
                    className="object-cover rounded-tr-xl"
                    fill
                  />
                )}
              </div>
            ) : (
              <div className="relative h-1/2">
                <File className="h-full w-full p-3.5 bg-zinc-300 rounded-tr-xl" />
              </div>
            )}

            {folder.items[2] ? (
              <div className="relative h-1/2">
                {folder.items[2].imageUrl && (
                  <Image
                    src={folder.items[2].imageUrl}
                    alt={folder.items[2].name}
                    className="object-cover"
                    fill
                  />
                )}
              </div>
            ) : (
              <div className="relative h-1/2">
                <File className="h-full w-full p-3.5 bg-zinc-300" />
              </div>
            )}
            <FolderActions id={folder.id} />
          </div>
        </div>

        <div className="p-4 relative overflow-hidden">
          <div className="flex items-center justify-between h-8">
            <span className="text-neutral-600 truncate">{folder.name}</span>
            <Actions id={folder.id} />
          </div>
          <div className="mt-8 mb-8 flex items-center">
            <Boxes className="h-3.5 w-3.5 mr-2" />
            <span className="truncate text-sm text-muted-foreground">
              {folder.items.length}
            </span>
            <TabSeparator />
            <span className="text-muted-foreground text-sm">
              &euro; {totalPrice}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};
