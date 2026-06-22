import "server-only";

const KST_UTC_OFFSET_HOURS = 9;
const MAX_DASHBOARD_DATE_LABELS = 370;

type DateParts = {
  year: number;
  month: number;
  day: number;
};

export type AdminDashboardDateWindow = {
  startsAt: string;
  endsBefore: string;
};

/**
 * 관리자 대시보드에서 실제 집계에 포함할 행사 날짜 범위를 계산합니다.
 *
 * 진행 중 행사는 행사 시작일~오늘, 종료 행사는 행사 시작일~종료일,
 * 예정 행사는 집계 범위 없음으로 처리합니다.
 *
 * @param startDate - 행사 시작일 YYYY-MM-DD
 * @param endDate - 행사 종료일 YYYY-MM-DD
 * @returns Supabase timestamp filter에 사용할 시작 시각과 종료 exclusive 시각
 */
export function getAdminDashboardDateWindow(
  startDate: string,
  endDate: string
): AdminDashboardDateWindow | null {
  const start = parseDateOnly(startDate);
  const cappedEnd = getCappedEndDate(startDate, endDate);

  if (!start || !cappedEnd || compareDateParts(start, cappedEnd) > 0) {
    return null;
  }

  return {
    startsAt: formatKstDateStartAsUtcTimestamp(start),
    endsBefore: formatKstDateStartAsUtcTimestamp(addDays(cappedEnd, 1)),
  };
}

/**
 * 관리자 대시보드에서 "오늘" 카드 집계에 사용할 KST 하루 범위를 계산합니다.
 *
 * 오늘이 행사 기간 안에 포함될 때만 오늘 00:00~내일 00:00 직전 범위를 반환하고,
 * 행사 시작 전이거나 종료 후이면 null을 반환합니다.
 *
 * @param startDate - 행사 시작일 YYYY-MM-DD
 * @param endDate - 행사 종료일 YYYY-MM-DD
 * @returns 오늘 집계용 시작 시각과 종료 exclusive 시각
 */
export function getAdminDashboardTodayWindow(
  startDate: string,
  endDate: string
): AdminDashboardDateWindow | null {
  const start = parseDateOnly(startDate);
  const end = parseDateOnly(endDate);
  const today = getToday();

  if (!start || !end || !today) {
    return null;
  }

  if (compareDateParts(today, start) < 0 || compareDateParts(today, end) > 0) {
    return null;
  }

  return {
    startsAt: formatKstDateStartAsUtcTimestamp(today),
    endsBefore: formatKstDateStartAsUtcTimestamp(addDays(today, 1)),
  };
}

/**
 * 관리자 대시보드 날짜 선택/차트에 표시할 날짜 label을 계산합니다.
 *
 * @param startDate - 행사 시작일 YYYY-MM-DD
 * @param endDate - 행사 종료일 YYYY-MM-DD
 * @returns `M/D` 형식의 날짜 label 목록
 */
export function getAdminDashboardDateLabels(
  startDate: string,
  endDate: string
) {
  const start = parseDateOnly(startDate);
  const cappedEnd = getCappedEndDate(startDate, endDate);

  if (!start || !cappedEnd || compareDateParts(start, cappedEnd) > 0) {
    return [];
  }

  const labels: string[] = [];
  let current = start;

  while (
    compareDateParts(current, cappedEnd) <= 0 &&
    labels.length < MAX_DASHBOARD_DATE_LABELS
  ) {
    labels.push(`${current.month}/${current.day}`);
    current = addDays(current, 1);
  }

  return labels;
}

const getCappedEndDate = (startDate: string, endDate: string) => {
  const end = parseDateOnly(endDate);
  const today = getToday();

  if (!parseDateOnly(startDate) || !end || !today) {
    return null;
  }

  return compareDateParts(end, today) < 0 ? end : today;
};

const parseDateOnly = (value: string): DateParts | null => {
  const [year, month, day] = value.split("-").map(Number);

  if (!year || !month || !day) {
    return null;
  }

  return { year, month, day };
};

const getToday = (): DateParts | null => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const day = now.getDate();

  if (!year || !month || !day) {
    return null;
  }

  return { year, month, day };
};

const compareDateParts = (left: DateParts, right: DateParts) => {
  const leftValue = left.year * 10000 + left.month * 100 + left.day;
  const rightValue = right.year * 10000 + right.month * 100 + right.day;

  return leftValue - rightValue;
};

const addDays = (date: DateParts, days: number): DateParts => {
  const next = new Date(Date.UTC(date.year, date.month - 1, date.day + days));

  return {
    year: next.getUTCFullYear(),
    month: next.getUTCMonth() + 1,
    day: next.getUTCDate(),
  };
};

const formatKstDateStartAsUtcTimestamp = (date: DateParts) => {
  const utcDate = new Date(
    Date.UTC(date.year, date.month - 1, date.day, -KST_UTC_OFFSET_HOURS)
  );

  return utcDate.toISOString().replace("T", " ").slice(0, 19);
};
