"use client";

import { VariantProps, cva } from "class-variance-authority";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

const avatarSizes = cva("", {
  variants: {
    size: {
      default: "h-8 w-8",
      md: "h-10 w-10",
      lg: "h-14 w-14",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

interface UserAvatarProps extends VariantProps<typeof avatarSizes> {
  username: string;
  imageUrl: string;
  className?: string;
}

export const UserAvatar = ({
  username,
  imageUrl,
  size,
  className,
}: UserAvatarProps) => {
  return (
    <div className={cn("relative", className)}>
      <Avatar className={cn(avatarSizes({ size }))}>
        <AvatarImage src={imageUrl} className="object-cover" />
        <AvatarFallback>
          {username[0]}
          {username[username.length - 1]}
        </AvatarFallback>
      </Avatar>
    </div>
  );
};
