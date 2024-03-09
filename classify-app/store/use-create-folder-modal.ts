import { create } from "zustand";

interface ICreateFolderModal {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useCreateFolderModal = create<ICreateFolderModal>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
