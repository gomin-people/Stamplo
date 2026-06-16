import { isValidPhone } from "@/utils";

describe("isValidPhone", () => {
  describe("유효한 번호", () => {
    it("02 지역번호 + 3자리 국번 (02-XXX-XXXX) 을 유효하다고 판단한다", () => {
      expect(isValidPhone("02-123-4567")).toBe(true);
    });

    it("02 지역번호 + 4자리 국번 (02-XXXX-XXXX) 을 유효하다고 판단한다", () => {
      expect(isValidPhone("02-1234-5678")).toBe(true);
    });

    it("010 휴대폰 번호 (010-XXXX-XXXX) 를 유효하다고 판단한다", () => {
      expect(isValidPhone("010-1234-5678")).toBe(true);
    });

    it("3자리 지역번호 + 3자리 국번 (0XX-XXX-XXXX) 을 유효하다고 판단한다", () => {
      expect(isValidPhone("042-481-4833")).toBe(true);
    });

    it("3자리 지역번호 + 4자리 국번 (0XX-XXXX-XXXX) 을 유효하다고 판단한다", () => {
      expect(isValidPhone("042-4814-4833")).toBe(true);
    });
  });

  describe("유효하지 않은 번호", () => {
    it("하이픈이 없는 번호는 유효하지 않다고 판단한다", () => {
      expect(isValidPhone("01012345678")).toBe(false);
    });

    it("국번이 2자리인 번호는 유효하지 않다고 판단한다", () => {
      expect(isValidPhone("010-12-5678")).toBe(false);
    });

    it("가입자 번호가 3자리인 번호는 유효하지 않다고 판단한다", () => {
      expect(isValidPhone("010-1234-567")).toBe(false);
    });

    it("지역번호가 0으로 시작하지 않으면 유효하지 않다고 판단한다", () => {
      expect(isValidPhone("10-1234-5678")).toBe(false);
    });

    it("빈 문자열은 유효하지 않다고 판단한다", () => {
      expect(isValidPhone("")).toBe(false);
    });

    it("문자가 포함된 번호는 유효하지 않다고 판단한다", () => {
      expect(isValidPhone("010-abcd-5678")).toBe(false);
    });
  });
});
