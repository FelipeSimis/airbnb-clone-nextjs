import { create } from 'zustand';

type ModalStore = {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
};

const createModal = () => {
  return create<ModalStore>(set => ({
    isOpen: false,
    openModal: () => set({ isOpen: true }),
    closeModal: () => set({ isOpen: false }),
  }));
};

export const useRegisterModal = createModal();
export const useLoginModal = createModal();
export const useSearchModal = createModal();
export const useRentModal = createModal();
export const useEditPropertyModal = createModal();
