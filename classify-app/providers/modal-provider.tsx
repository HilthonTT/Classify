"use client";

import { useEffect, useState } from "react";

import { CreateItemModal } from "@/components/modals/create-item-modal";
import { UpdateItemQuantityModal } from "@/components/modals/update-item-quantity-modal";
import { CreateFolderModal } from "@/components/modals/create-folder-modal";
import { MoveFolderModal } from "@/components/modals/move-folder-modal";

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
      <CreateFolderModal />
      <MoveFolderModal />
      <UpdateItemQuantityModal />
    </>
  );
};
