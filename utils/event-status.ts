export type EventOperationStatus = {
  isBefore: boolean; // 행사 시작 전
  isDuring: boolean; // 행사 진행 중
  isAfter: boolean; // 행사 종료
};

export type AdminEventStatusLabel =
  | "현재 운영 중인 행사"
  | "준비 중인 행사"
  | "종료된 행사";

export const getLocalDateKey = () => {
  const kst = new Date(Date.now() + 9 * 60 * 60 * 1000);
  const year = kst.getUTCFullYear();
  const month = String(kst.getUTCMonth() + 1).padStart(2, "0");
  const day = String(kst.getUTCDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const getDateKey = (value: string) => value.slice(0, 10);

export function getEventOperationStatus(
  startDate: string,
  endDate: string
): EventOperationStatus {
  const today = getLocalDateKey();
  const start = getDateKey(startDate);
  const end = getDateKey(endDate);

  return {
    isBefore: today < start,
    isDuring: today >= start && today <= end,
    isAfter: today > end,
  };
}

export const getAdminEventStatusLabel = (
  startDate: string,
  endDate: string
): AdminEventStatusLabel => {
  const { isBefore, isDuring } = getEventOperationStatus(startDate, endDate);

  if (isDuring) {
    return "현재 운영 중인 행사";
  }

  if (isBefore) {
    return "준비 중인 행사";
  }

  return "종료된 행사";
};
