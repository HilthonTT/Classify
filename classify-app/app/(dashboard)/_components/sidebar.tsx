"use client";

import Image from "next/image";
import Link from "next/link";
import {
  BarChartBig,
  Building,
  LayoutDashboard,
  PackageOpen,
  Search,
  Settings,
  Tags,
} from "lucide-react";
import { Pacifico } from "next/font/google";

import { cn } from "@/lib/utils";

import { Item } from "./item";

const font = Pacifico({
  subsets: ["latin"],
  weight: ["400"],
});

export const Sidebar = () => {
  return (
    <aside className="fixed left-0 h-full bg-blue-600 lg:w-[184px] w-[82px] text-white lg:flex flex-col pt-5">
      <Link href="/">
        <div className="flex flex-col items-center justify-center gap-x-2 w-auto">
          <Image
            src="/logo.svg"
            alt="Logo"
            height={60}
            width={60}
            className="object-cover"
          />
          <span
            className={cn(
              "font-semibold text-2xl hidden lg:block",
              font.className
            )}>
            Classify
          </span>
        </div>
      </Link>

      <div className="space-y-3 px-3 pt-5">
        <Item icon={LayoutDashboard} label="Dashboard" href="/" />
        <Item icon={PackageOpen} label="Items" href="/items" />
        <Item icon={Search} label="Search" href="/advanced-search" />
        <Item icon={Tags} label="Tags" href="/tags" />
        <Item icon={BarChartBig} label="Reports" href="/items" />
      </div>
      <div className="mt-auto pb-5 space-y-3 px-3">
        <Item icon={Building} label="Organizations" href="/organizations" />
        <Item icon={Settings} label="Settings" href="/settings" />
      </div>
    </aside>
  );
};
