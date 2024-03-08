"use client";

import Image from "next/image";

export const EmptyItems = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center">
      <Image
        src="/computer.jpg"
        alt="No Organization"
        className="object-cover rounded-full grayscale"
        width={300}
        height={300}
      />
      <h2 className="text-2xl font-semibold mt-6">No items found!</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        You have no ideas in your trash.
      </p>
    </div>
  );
};
