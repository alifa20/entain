import { formatTime } from "./formatTime";

describe("timeFormatter", () => {
  const now = new Date("2026-01-31T14:30:00").getTime();

  beforeEach(() => {
    jest.spyOn(Date, "now").mockReturnValue(now);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe("formatTime", () => {
    test("returns '--:--' for null timestamp", () => {
      expect(formatTime(null)).toBe("--:--");
    });

    test("formats time in HH:mm format", () => {
      const timestamp = new Date("2026-01-31T14:30:00").getTime();
      expect(formatTime(timestamp)).toBe("14:30:00");
    });

    test("pads single digit hours and minutes with zero", () => {
      const timestamp = new Date("2026-01-31T09:05:00").getTime();
      expect(formatTime(timestamp)).toBe("09:05:00");
    });

    test("handles midnight correctly", () => {
      const timestamp = new Date("2026-01-31T00:00:00").getTime();
      expect(formatTime(timestamp)).toBe("00:00:00");
    });

    test("handles noon correctly", () => {
      const timestamp = new Date("2026-01-31T12:00:00").getTime();
      expect(formatTime(timestamp)).toBe("12:00:00");
    });
  });
});
