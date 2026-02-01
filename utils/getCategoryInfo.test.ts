import { CATEGORY_IDS } from "@/types/races";
import { getCategoryInfo } from "./getCategoryInfo";

describe("getCategoryInfo", () => {
  it("returns correct info for horse racing", () => {
    const info = getCategoryInfo(CATEGORY_IDS.HORSE_RACING);
    expect(info.name).toBe("Horse Racing");
    expect(info.color).toContain("blue");
  });

  it("returns correct info for greyhound", () => {
    const info = getCategoryInfo(CATEGORY_IDS.GREYHOUND);
    expect(info.name).toBe("Greyhound");
    expect(info.color).toContain("green");
  });

  it("returns correct info for harness", () => {
    const info = getCategoryInfo(CATEGORY_IDS.HARNESS);
    expect(info.name).toBe("Harness");
    expect(info.color).toContain("purple");
  });

  it("returns default info for unknown category", () => {
    const info = getCategoryInfo("unknown-id");
    expect(info.name).toBe("Racing");
    expect(info.color).toContain("gray");
  });
});
