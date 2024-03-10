import { create } from "zustand";

import { Item } from "@/types/item";

interface IMoveFolderModal {
  isOpen: boolean;
  onOpen: (item: Item) => void;
  onClose: () => void;
  item: Item | null;
}

export const useMoveFolderModal = create<IMoveFolderModal>((set) => ({
  isOpen: false,
  onOpen: (item: Item) => set({ isOpen: true, item }),
  onClose: () => set({ isOpen: false, item: null }),
  item: null,
}));
