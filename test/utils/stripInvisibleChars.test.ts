import { stripInvisibleChars } from "@/utils";

describe("stripInvisibleChars", () => {
  it("일반 문자열은 변경하지 않는다", () => {
    expect(stripInvisibleChars("홍길동")).toBe("홍길동");
  });

  it("Zero Width Space (U+200B) 를 공백으로 치환한다", () => {
    expect(stripInvisibleChars("홍​길동")).toBe("홍 길동");
  });

  it("Zero Width Non-Joiner (U+200C) 를 공백으로 치환한다", () => {
    expect(stripInvisibleChars("홍‌길동")).toBe("홍 길동");
  });

  it("Zero Width Joiner (U+200D) 를 공백으로 치환한다", () => {
    expect(stripInvisibleChars("홍‍길동")).toBe("홍 길동");
  });

  it("BOM (U+FEFF) 을 공백으로 치환한다", () => {
    expect(stripInvisibleChars("﻿홍길동")).toBe(" 홍길동");
  });

  it("한글 채움 문자 (U+3164) 를 공백으로 치환한다", () => {
    expect(stripInvisibleChars("홍ㅤ길동")).toBe("홍 길동");
  });

  it("Mongolian Vowel Separator (U+180E) 를 공백으로 치환한다", () => {
    expect(stripInvisibleChars("홍᠎길동")).toBe("홍 길동");
  });

  it("Soft Hyphen (U+00AD) 을 공백으로 치환한다", () => {
    expect(stripInvisibleChars("홍­길동")).toBe("홍 길동");
  });

  it("여러 개의 비가시 문자를 모두 치환한다", () => {
    expect(stripInvisibleChars("홍​길ㅤ동")).toBe("홍 길 동");
  });

  it("빈 문자열은 그대로 반환한다", () => {
    expect(stripInvisibleChars("")).toBe("");
  });
});
