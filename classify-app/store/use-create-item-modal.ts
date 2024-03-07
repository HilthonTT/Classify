import { create } from "zustand";

interface ICreateItemModal {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useCreateItemModal = create<ICreateItemModal>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
