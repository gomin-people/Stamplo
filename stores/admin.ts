import { create } from "zustand";
import { combine } from "zustand/middleware";

export const adminStore = create(
  combine(
    {
      isEditMode: false,
      pendingHref: null as string | null,
    },
    (set) => ({
      setIsEditMode: (value: boolean) => set({ isEditMode: value }),
      setPendingHref: (href: string | null) => set({ pendingHref: href }),
    })
  )
);

export const useIsEditMode = () => adminStore((store) => store.isEditMode);
export const useSetIsEditMode = () =>
  adminStore((store) => store.setIsEditMode);
export const usePendingHref = () => adminStore((store) => store.pendingHref);
export const useSetPendingHref = () =>
  adminStore((store) => store.setPendingHref);
