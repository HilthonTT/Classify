"use client";

import Link from "next/link";
import { LucideIcon } from "lucide-react";
import { usePathname } from "next/navigation";

import { Hint } from "@/components/hint";
import { cn } from "@/lib/utils";

interface ItemProps {
  icon: LucideIcon;
  label: string;
  href: string;
}

export const Item = ({ icon: Icon, label, href }: ItemProps) => {
  const pathname = usePathname();

  const active = pathname === href;

  return (
    <Hint
      label={label}
      side="right"
      align="start"
      sideOffset={20}
      alignOffset={-8}>
      <Link
        href={href}
        className={cn(
          "bg-transparent p-2 flex items-center justify-center rounded-md hover:bg-blue-500/90 transition",
          active && "bg-blue-500/90"
        )}>
        <Icon className="h-6 w-6 lg:hidden block" />
        <div className="items-center gap-2 w-full hidden lg:flex">
          <Icon className="h-6 w-6" />
          <span
            className={cn(
              "text-base truncate text-neutral-300",
              active && "text-white"
            )}>
            {label}
          </span>
        </div>
      </Link>
    </Hint>
  );
};
