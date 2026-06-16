import { getEventOperationStatus } from "@/utils/event-status";

describe("getEventOperationStatus", () => {
  afterEach(() => {
    jest.useRealTimers();
  });

  const mockToday = (isoUtc: string) => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date(isoUtc));
  };

  it("오늘이 시작일 이전이면 isBefore 가 true 이다", () => {
    mockToday("2026-06-10T00:00:00Z"); // KST 2026-06-10
    const status = getEventOperationStatus("2026-06-15", "2026-06-20");
    expect(status).toEqual({ isBefore: true, isDuring: false, isAfter: false });
  });

  it("오늘이 시작일이면 isDuring 이 true 이다", () => {
    mockToday("2026-06-15T00:00:00Z"); // KST 2026-06-15
    const status = getEventOperationStatus("2026-06-15", "2026-06-20");
    expect(status).toEqual({ isBefore: false, isDuring: true, isAfter: false });
  });

  it("오늘이 시작일과 종료일 사이면 isDuring 이 true 이다", () => {
    mockToday("2026-06-17T00:00:00Z"); // KST 2026-06-17
    const status = getEventOperationStatus("2026-06-15", "2026-06-20");
    expect(status).toEqual({ isBefore: false, isDuring: true, isAfter: false });
  });

  it("오늘이 종료일이면 isDuring 이 true 이다", () => {
    mockToday("2026-06-20T00:00:00Z"); // KST 2026-06-20
    const status = getEventOperationStatus("2026-06-15", "2026-06-20");
    expect(status).toEqual({ isBefore: false, isDuring: true, isAfter: false });
  });

  it("오늘이 종료일 이후면 isAfter 가 true 이다", () => {
    mockToday("2026-06-21T00:00:00Z"); // KST 2026-06-21
    const status = getEventOperationStatus("2026-06-15", "2026-06-20");
    expect(status).toEqual({ isBefore: false, isDuring: false, isAfter: true });
  });

  it("시작일과 종료일이 같은 하루짜리 행사도 올바르게 판단한다", () => {
    mockToday("2026-06-15T00:00:00Z"); // KST 2026-06-15
    const status = getEventOperationStatus("2026-06-15", "2026-06-15");
    expect(status).toEqual({ isBefore: false, isDuring: true, isAfter: false });
  });

  it("UTC 기준 자정 직전이라도 KST로 환산해 날짜를 판단한다", () => {
    mockToday("2026-06-14T15:01:00Z"); // UTC 6/14 15:01 -> KST 6/15 00:01
    const status = getEventOperationStatus("2026-06-15", "2026-06-20");
    expect(status).toEqual({ isBefore: false, isDuring: true, isAfter: false });
  });

  it("시각/타임스탬프가 포함된 날짜 문자열도 날짜만 추출해 비교한다", () => {
    mockToday("2026-06-17T00:00:00Z"); // KST 2026-06-17
    const status = getEventOperationStatus(
      "2026-06-15T09:00:00+09:00",
      "2026-06-20T18:00:00+09:00"
    );
    expect(status).toEqual({ isBefore: false, isDuring: true, isAfter: false });
  });
});
