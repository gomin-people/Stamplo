import "server-only";

const KST_UTC_OFFSET_HOURS = 9;
const MAX_DASHBOARD_DATE_LABELS = 370;

type DateParts = {
  year: number;
  month: number;
  day: number;
};

type DateTimeParts = DateParts & {
  hour: number;
};

export type AdminDashboardDateWindow = {
  startsAt: string;
  endsBefore: string;
};

const kstDateTimeFormatter = new Intl.DateTimeFormat("ko-KR", {
  timeZone: "Asia/Seoul",
  year: "numeric",
  month: "numeric",
  day: "numeric",
  hour: "numeric",
  hourCycle: "h23",
});

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
 * 관리자 대시보드에서 오늘 카드 집계에 사용할 KST 하루 범위를 계산합니다.
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

/**
 * DB에 UTC 기준으로 저장된 timestamp 문자열을 KST 기준 날짜/시간 파트로 변환합니다.
 *
 * timezone 정보가 없는 문자열은 UTC로 간주한 뒤 KST로 변환합니다.
 *
 * @param value - DB에서 읽은 timestamp 문자열
 * @returns KST 기준 year/month/day/hour, 파싱 실패 시 null
 */
export const getKstDateTimePartsFromStoredUtcTimestamp = (value: string) => {
  const timestamp = parseStoredUtcTimestamp(value);

  if (!timestamp) {
    return null;
  }

  return getKstDateTimeParts(timestamp);
};

/**
 * 행사 종료일과 KST 기준 오늘 중 더 이른 날짜를 집계 종료일로 선택합니다.
 *
 * @param startDate - 행사 시작일 YYYY-MM-DD
 * @param endDate - 행사 종료일 YYYY-MM-DD
 * @returns 집계에 사용할 마지막 날짜, 계산 불가 시 null
 */
const getCappedEndDate = (startDate: string, endDate: string) => {
  const end = parseDateOnly(endDate);
  const today = getToday();

  if (!parseDateOnly(startDate) || !end || !today) {
    return null;
  }

  return compareDateParts(end, today) < 0 ? end : today;
};

/**
 * YYYY-MM-DD 형식 문자열을 숫자 날짜 파트로 파싱합니다.
 *
 * @param value - 날짜 문자열
 * @returns year/month/day 객체, 파싱 실패 시 null
 */
const parseDateOnly = (value: string): DateParts | null => {
  const [year, month, day] = value.split("-").map(Number);

  if (!year || !month || !day) {
    return null;
  }

  return { year, month, day };
};

/**
 * 현재 시각을 KST로 해석한 오늘 날짜를 반환합니다.
 *
 * @returns KST 기준 오늘 year/month/day, 계산 불가 시 null
 */
const getToday = (): DateParts | null => {
  const today = getKstDateTimeParts(new Date());

  if (!today) {
    return null;
  }

  return {
    year: today.year,
    month: today.month,
    day: today.day,
  };
};

/**
 * 두 날짜 파트를 YYYYMMDD 숫자로 비교합니다.
 *
 * @returns 음수면 left가 이전, 0이면 동일, 양수면 left가 이후
 */
const compareDateParts = (left: DateParts, right: DateParts) => {
  const leftValue = left.year * 10000 + left.month * 100 + left.day;
  const rightValue = right.year * 10000 + right.month * 100 + right.day;

  return leftValue - rightValue;
};

/**
 * 날짜 파트에 일수를 더해 다음 날짜 파트를 계산합니다.
 *
 * UTC Date를 중간 계산용으로만 사용하고, 반환값 자체는 순수 날짜 파트입니다.
 */
const addDays = (date: DateParts, days: number): DateParts => {
  const next = new Date(Date.UTC(date.year, date.month - 1, date.day + days));

  return {
    year: next.getUTCFullYear(),
    month: next.getUTCMonth() + 1,
    day: next.getUTCDate(),
  };
};

/**
 * KST 하루 시작 시각을 UTC timestamp 문자열로 변환합니다.
 *
 * 예: 2026-06-22 KST 00:00 -> 2026-06-21 15:00:00 UTC
 */
const formatKstDateStartAsUtcTimestamp = (date: DateParts) => {
  const utcDate = new Date(
    Date.UTC(date.year, date.month - 1, date.day, -KST_UTC_OFFSET_HOURS)
  );

  return utcDate.toISOString().replace("T", " ").slice(0, 19);
};

/**
 * Date 객체를 KST 기준 year/month/day/hour 파트로 분해합니다.
 *
 * @param date - 변환할 시각
 * @returns KST 기준 날짜/시간 파트, 추출 실패 시 null
 */
const getKstDateTimeParts = (date: Date): DateTimeParts | null => {
  const parts = kstDateTimeFormatter.formatToParts(date);
  const year = getDateTimePartValue(parts, "year");
  const month = getDateTimePartValue(parts, "month");
  const day = getDateTimePartValue(parts, "day");
  const hour = getDateTimePartValue(parts, "hour");

  if (!year || !month || !day || hour === null || !Number.isInteger(hour)) {
    return null;
  }

  return {
    year,
    month,
    day,
    hour: hour === 24 ? 0 : hour,
  };
};

/**
 * `formatToParts()` 결과에서 특정 파트를 숫자로 추출합니다.
 *
 * @param parts - Intl.DateTimeFormat 분해 결과
 * @param type - 추출할 파트 타입
 * @returns 숫자 값, 변환 실패 시 null
 */
const getDateTimePartValue = (
  parts: Intl.DateTimeFormatPart[],
  type: Intl.DateTimeFormatPartTypesRegistry[keyof Intl.DateTimeFormatPartTypesRegistry]
) => {
  const value = parts.find((part) => part.type === type)?.value;
  const parsedValue = value ? Number(value) : Number.NaN;

  return Number.isFinite(parsedValue) ? parsedValue : null;
};

/**
 * DB timestamp 문자열을 UTC 기준 Date 객체로 파싱합니다.
 *
 * timestamp without time zone 컬럼에서 timezone 정보 없이 내려오는 값은
 * UTC 저장값으로 간주하기 위해 `Z`를 붙여 해석합니다.
 *
 * @param value - DB timestamp 문자열
 * @returns UTC 기준 Date, 파싱 실패 시 null
 */
const parseStoredUtcTimestamp = (value: string) => {
  const trimmed = value.trim();

  if (!trimmed) {
    return null;
  }

  const hasTimeZone = /(?:Z|[+-]\d{2}:?\d{2})$/i.test(trimmed);
  const timestamp = new Date(hasTimeZone ? trimmed : `${trimmed}Z`);

  return Number.isNaN(timestamp.getTime()) ? null : timestamp;
};
