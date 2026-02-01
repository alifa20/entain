import { ApiResponse, CATEGORY_IDS, LiveRace } from "@/types/races";
import { apiSampleData } from "@/__fixtures__/api.data";
import { getRaces } from "./getRaces";

describe("getRaces", () => {
  test("handles missing data", () => {
    expect(getRaces({ data: undefined, selectedCategory: null, liveRaces: [] })).toEqual([]);
    expect(getRaces({ data: {} as ApiResponse, selectedCategory: null, liveRaces: [] })).toEqual([]);
  });

  test("returns up to 5 races sorted by time", () => {
    const races = getRaces({ data: apiSampleData as ApiResponse, selectedCategory: null, liveRaces: [] });

    expect(races.length).toBeLessThanOrEqual(5);
    for (let i = 1; i < races.length; i++) {
      expect(races[i].advertised_start.seconds).toBeGreaterThanOrEqual(races[i - 1].advertised_start.seconds);
    }
  });

  test("filters by category", () => {
    const greyhoundRaces = getRaces({
      data: apiSampleData as ApiResponse,
      selectedCategory: CATEGORY_IDS.GREYHOUND,
      liveRaces: [],
    });

    greyhoundRaces.forEach((race) => {
      expect(race.category_id).toBe(CATEGORY_IDS.GREYHOUND);
    });
  });

  test("prioritizes live races", () => {
    const liveRaceId = apiSampleData.data.next_to_go_ids[0];
    const liveRace = apiSampleData.data.race_summaries[liveRaceId];

    const liveRaces: LiveRace[] = [{ race: liveRace, startedAt: Date.now() / 1000 }];
    const races = getRaces({ data: apiSampleData as ApiResponse, selectedCategory: null, liveRaces });

    expect(races[0].race_id).toBe(liveRaceId);
  });

  test("filters live races by category", () => {
    const greyhoundRaceId = Object.keys(apiSampleData.data.race_summaries).find(
      (id) => apiSampleData.data.race_summaries[id].category_id === CATEGORY_IDS.GREYHOUND,
    );

    if (!greyhoundRaceId) return;

    const liveRaces: LiveRace[] = [
      { race: apiSampleData.data.race_summaries[greyhoundRaceId], startedAt: Date.now() / 1000 },
    ];

    const races = getRaces({
      data: apiSampleData as ApiResponse,
      selectedCategory: CATEGORY_IDS.HORSE_RACING,
      liveRaces,
    });

    races.forEach((race) => {
      expect(race.category_id).toBe(CATEGORY_IDS.HORSE_RACING);
    });
  });

  test("excludes duplicates between live and upcoming", () => {
    const raceId = apiSampleData.data.next_to_go_ids[0];
    const liveRaces: LiveRace[] = [
      { race: apiSampleData.data.race_summaries[raceId], startedAt: Date.now() / 1000 },
    ];

    const races = getRaces({ data: apiSampleData as ApiResponse, selectedCategory: null, liveRaces });
    const raceIds = races.map((r) => r.race_id);
    const uniqueIds = new Set(raceIds);

    expect(raceIds.length).toBe(uniqueIds.size);
  });
});
