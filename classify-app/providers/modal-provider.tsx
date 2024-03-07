"use client";

import { useEffect, useState } from "react";

import { CreateItemModal } from "@/components/modals/create-item-modal";
import { UpdateItemQuantityModal } from "@/components/modals/update-item-quantity-modal";

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
      <UpdateItemQuantityModal />
    </>
  );
};
