import { ApiResponse } from "@/types/races";
import { getRaces } from "./getRaces";
import { apiSampleData } from "@/__fixtures__/api.data";

describe("getRaces", () => {
  it("should return empty array when data is empty", () => {
    const data = {} as ApiResponse;
    const result = getRaces({ data });

    expect(result).toEqual([]);
  });

  it("should return array of 5 races based on the sample data", () => {
    const data = apiSampleData as ApiResponse;
    const result = getRaces({ data });

    expect(result).toHaveLength(5);
  });

  it("should have the closest race first", () => {
    const data = apiSampleData as ApiResponse;
    const result = getRaces({ data });

    expect(result[0].advertised_start.seconds).toBeLessThan(
      result[1].advertised_start.seconds,
    );
  });
});
