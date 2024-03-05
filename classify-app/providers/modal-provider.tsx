"use client";

import { useEffect, useState } from "react";

import { CreateItemModal } from "@/components/modals/create-item-modal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <CreateItemModal />
    </>
  );
};
