import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
import { RaceSummary } from "@/types/races";

export const LIVE_RACE_DURATION_SECONDS = 60;

interface LiveRace {
  race: RaceSummary;
  startedAt: number;
}

interface LiveRacesState {
  races: Record<string, LiveRace>;
}

const initialState: LiveRacesState = {
  races: {},
};

export const liveRacesSlice = createSlice({
  name: "liveRaces",
  initialState,
  reducers: {
    addLiveRace: (state, action: PayloadAction<RaceSummary>) => {
      const race = action.payload;
      state.races[race.race_id] = {
        race,
        startedAt: Math.floor(Date.now() / 1000),
      };
    },

    removeLiveRace: (state, action: PayloadAction<string>) => {
      delete state.races[action.payload];
    },
  },
});

export const { addLiveRace, removeLiveRace } = liveRacesSlice.actions;

const selectLiveRacesState = (state: { liveRaces: LiveRacesState }) =>
  state.liveRaces.races;

export const selectLiveRaces = createSelector([selectLiveRacesState], (races) =>
  Object.values(races),
);

export const selectIsRaceLive = (raceId: string) =>
  createSelector([selectLiveRacesState], (races) => !!races[raceId]);

export const selectLiveRaceStartTime = (raceId: string) =>
  createSelector([selectLiveRacesState], (races) => races[raceId]?.startedAt);

export default liveRacesSlice.reducer;
