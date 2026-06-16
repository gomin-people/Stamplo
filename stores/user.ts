import { create } from "zustand";
import { combine } from "zustand/middleware";

export const userStore = create(
  combine(
    {
      newlyStampedMissionId: null as number | null,
      hasCelebrationFired: false,
    },
    (set) => ({
      setNewlyStampedMissionId: (id: number) =>
        set({ newlyStampedMissionId: id }),
      clearNewlyStampedMissionId: () =>
        set({ newlyStampedMissionId: null, hasCelebrationFired: false }),
      markCelebrationFired: () => set({ hasCelebrationFired: true }),
    })
  )
);

export const useNewlyStampedMissionId = () =>
  userStore((store) => store.newlyStampedMissionId);
export const useSetNewlyStampedMissionId = () =>
  userStore((store) => store.setNewlyStampedMissionId);
export const useClearNewlyStampedMissionId = () =>
  userStore((store) => store.clearNewlyStampedMissionId);
export const useHasCelebrationFired = () =>
  userStore((store) => store.hasCelebrationFired);
export const useMarkCelebrationFired = () =>
  userStore((store) => store.markCelebrationFired);
