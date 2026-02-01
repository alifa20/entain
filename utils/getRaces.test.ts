import { ApiResponse } from "@/types/races";
import { getRaces } from "./getRaces";

describe("getRaces", () => {
  it("should return empty array when data is empty", () => {
    const data = {} as ApiResponse;
    const result = getRaces({ data });
    expect(result).toEqual([]);
  });
});
