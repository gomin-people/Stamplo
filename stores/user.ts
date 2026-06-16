import { create } from "zustand";
import { combine } from "zustand/middleware";

export const userStore = create(
  combine(
    {
      newlyStampedMissionId: null as number | null,
    },
    (set) => ({
      setNewlyStampedMissionId: (id: number) =>
        set({ newlyStampedMissionId: id }),
      clearNewlyStampedMissionId: () => set({ newlyStampedMissionId: null }),
    })
  )
);

export const useNewlyStampedMissionId = () =>
  userStore((store) => store.newlyStampedMissionId);
export const useSetNewlyStampedMissionId = () =>
  userStore((store) => store.setNewlyStampedMissionId);
export const useClearNewlyStampedMissionId = () =>
  userStore((store) => store.clearNewlyStampedMissionId);
