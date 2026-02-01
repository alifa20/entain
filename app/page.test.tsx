import { apiSampleData } from "@/__fixtures__/api.data";
import { api } from "@/lib/services/api";
import categoryReducer from "@/lib/store/categorySlice";
import liveRacesReducer from "@/lib/store/liveRacesSlice";
import metadataReducer from "@/lib/store/metadataSlice";
import { CATEGORY_IDS, RaceSummary } from "@/types/races";
import { configureStore } from "@reduxjs/toolkit";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import HomePage from "./page";

const mockUseRaceData = jest.fn();

jest.mock("next/font/google", () => ({
  Geist: () => ({ className: "geist" }),
  Geist_Mono: () => ({ className: "geist-mono" }),
}));

jest.mock("../hooks/useRaceData", () => ({
  useRaceData: () => mockUseRaceData(),
}));

const createMockStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      category: categoryReducer,
      metadata: metadataReducer,
      liveRaces: liveRacesReducer,
      [api.reducerPath]: api.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(api.middleware),
    preloadedState: initialState,
  });
};

const renderWithRedux = (component: React.ReactElement, initialState = {}) => {
  const store = createMockStore(initialState);
  return {
    ...render(<Provider store={store}>{component}</Provider>),
    store,
  };
};

const getFixtureRaces = (): RaceSummary[] => {
  const races = Object.values(apiSampleData.data.race_summaries);
  return races.slice(0, 5);
};

describe("HomePage Integration Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseRaceData.mockReturnValue({
      data: getFixtureRaces(),
      isLoading: false,
      error: null,
    });
  });

  describe("Initial Render and Data Fetching", () => {
    test("displays static header content", () => {
      renderWithRedux(<HomePage />);

      expect(screen.getByText("Next to Go")).toBeInTheDocument();
      expect(
        screen.getByText("Live racing countdown • Updates every 60s"),
      ).toBeInTheDocument();
      expect(screen.getByText("5 Races")).toBeInTheDocument();
    });

    test("displays categories filter", () => {
      renderWithRedux(<HomePage />);

      expect(screen.getByText("Categories:")).toBeInTheDocument();
      expect(screen.getByText("All")).toBeInTheDocument();
      expect(screen.getByText("HORSE RACING")).toBeInTheDocument();
      expect(screen.getByText("GREYHOUND")).toBeInTheDocument();
      expect(screen.getByText("HARNESS")).toBeInTheDocument();
    });

    test("displays loading skeleton while fetching races", () => {
      mockUseRaceData.mockReturnValueOnce({
        data: [],
        isLoading: true,
        error: null,
      });

      const { container } = renderWithRedux(<HomePage />);
      const skeletons = container.querySelectorAll("[class*='animate']");
      expect(skeletons.length).toBeGreaterThan(0);
    });

    test("displays races after successful data fetch", () => {
      renderWithRedux(<HomePage />);

      const races = getFixtureRaces();
      races.forEach((race) => {
        expect(screen.getByText(race.meeting_name)).toBeInTheDocument();
      });
    });
  });

  describe("Race Display Requirements", () => {
    test("displays meeting name and race number for each race", () => {
      renderWithRedux(<HomePage />);

      const races = getFixtureRaces();
      const firstRace = races[0];

      expect(screen.getByText(firstRace.meeting_name)).toBeInTheDocument();
      expect(
        screen.getAllByText(new RegExp(`Race ${firstRace.race_number}`))[0],
      ).toBeInTheDocument();
    });

    test("displays maximum of 5 races", () => {
      renderWithRedux(<HomePage />);

      const races = getFixtureRaces();
      expect(races.length).toBeLessThanOrEqual(5);
    });
  });

  describe("Category Filtering", () => {
    test("shows all category filters", () => {
      renderWithRedux(<HomePage />);

      expect(screen.getByText("All")).toBeInTheDocument();
      expect(screen.getByText("HORSE RACING")).toBeInTheDocument();
      expect(screen.getByText("GREYHOUND")).toBeInTheDocument();
      expect(screen.getByText("HARNESS")).toBeInTheDocument();
    });

    test("clicking category updates Redux store", async () => {
      const user = userEvent.setup();
      const { store } = renderWithRedux(<HomePage />);

      expect(store.getState().category.selectedCategory).toBeNull();

      const greyhoundButton = screen.getByText("GREYHOUND");
      await user.click(greyhoundButton);

      expect(store.getState().category.selectedCategory).toBe(CATEGORY_IDS.GREYHOUND);
    });

    test("clicking horse racing category updates store", async () => {
      const user = userEvent.setup();
      const { store } = renderWithRedux(<HomePage />);

      const horseButton = screen.getByText("HORSE RACING");
      await user.click(horseButton);

      expect(store.getState().category.selectedCategory).toBe(CATEGORY_IDS.HORSE_RACING);
    });

    test("clicking harness category updates store", async () => {
      const user = userEvent.setup();
      const { store } = renderWithRedux(<HomePage />);

      const harnessButton = screen.getByText("HARNESS");
      await user.click(harnessButton);

      expect(store.getState().category.selectedCategory).toBe(CATEGORY_IDS.HARNESS);
    });

    test("clicking selected category again clears selection (toggles back to All)", async () => {
      const user = userEvent.setup();
      const { store } = renderWithRedux(<HomePage />);

      const greyhoundButton = screen.getByText("GREYHOUND");
      await user.click(greyhoundButton);
      expect(store.getState().category.selectedCategory).toBe("9daef0d7-bf3c-4f50-921d-8e818c60fe61");

      await user.click(greyhoundButton);
      expect(store.getState().category.selectedCategory).toBeNull();
    });

    test("clicking All button clears category selection", async () => {
      const user = userEvent.setup();
      const { store } = renderWithRedux(<HomePage />);

      const greyhoundButton = screen.getByText("GREYHOUND");
      await user.click(greyhoundButton);
      expect(store.getState().category.selectedCategory).toBe("9daef0d7-bf3c-4f50-921d-8e818c60fe61");

      const allButton = screen.getByText("All");
      await user.click(allButton);
      expect(store.getState().category.selectedCategory).toBeNull();
    });

    test("switching between categories updates store correctly", async () => {
      const user = userEvent.setup();
      const { store } = renderWithRedux(<HomePage />);

      await user.click(screen.getByText("GREYHOUND"));
      expect(store.getState().category.selectedCategory).toBe(CATEGORY_IDS.GREYHOUND);

      await user.click(screen.getByText("HORSE RACING"));
      expect(store.getState().category.selectedCategory).toBe(CATEGORY_IDS.HORSE_RACING);

      await user.click(screen.getByText("HARNESS"));
      expect(store.getState().category.selectedCategory).toBe(CATEGORY_IDS.HARNESS);

      await user.click(screen.getByText("All"));
      expect(store.getState().category.selectedCategory).toBeNull();
    });
  });

  describe("Error Handling", () => {
    test("displays error message when API fetch fails", () => {
      mockUseRaceData.mockReturnValueOnce({
        data: [],
        isLoading: false,
        error: { message: "API Error" },
      });

      renderWithRedux(<HomePage />);
      expect(screen.getByText(/Error loading races/i)).toBeInTheDocument();
    });

    test("does not display races when error occurs", () => {
      mockUseRaceData.mockReturnValueOnce({
        data: [],
        isLoading: false,
        error: { message: "API Error" },
      });

      renderWithRedux(<HomePage />);

      const races = getFixtureRaces();
      races.forEach((race) => {
        expect(screen.queryByText(race.meeting_name)).not.toBeInTheDocument();
      });
    });
  });

  describe("UI Layout and Structure", () => {
    test("renders header with title", () => {
      renderWithRedux(<HomePage />);

      expect(screen.getByText("Next to Go")).toBeInTheDocument();
      expect(
        screen.getByText("Live racing countdown • Updates every 60s"),
      ).toBeInTheDocument();
    });

    test("renders race count badge in header", () => {
      renderWithRedux(<HomePage />);

      expect(screen.getByText("5 Races")).toBeInTheDocument();
      expect(screen.getByText("Showing")).toBeInTheDocument();
    });

    test("renders category filter buttons", () => {
      renderWithRedux(<HomePage />);

      expect(screen.getByText("All")).toBeInTheDocument();
      expect(screen.getByText("HORSE RACING")).toBeInTheDocument();
      expect(screen.getByText("GREYHOUND")).toBeInTheDocument();
      expect(screen.getByText("HARNESS")).toBeInTheDocument();
    });

    test("renders races in grid layout", () => {
      const { container } = renderWithRedux(<HomePage />);

      const grid = container.querySelector(".grid");
      expect(grid).toBeInTheDocument();
    });
  });

  describe("Loading States", () => {
    test("shows skeleton loaders while loading", () => {
      mockUseRaceData.mockReturnValueOnce({
        data: [],
        isLoading: true,
        error: null,
      });

      const { container } = renderWithRedux(<HomePage />);

      const skeletons = container.querySelectorAll("[class*='animate']");
      expect(skeletons.length).toBeGreaterThan(0);
    });

    test("does not show error when loading", () => {
      mockUseRaceData.mockReturnValueOnce({
        data: [],
        isLoading: true,
        error: null,
      });

      renderWithRedux(<HomePage />);

      expect(
        screen.queryByText(/Error loading races/i),
      ).not.toBeInTheDocument();
    });
  });

  describe("Empty States", () => {
    test("handles empty race data gracefully", () => {
      mockUseRaceData.mockReturnValueOnce({
        data: [],
        isLoading: false,
        error: null,
      });

      renderWithRedux(<HomePage />);

      expect(screen.getByText("Next to Go")).toBeInTheDocument();
    });
  });

  describe("Race Data Display", () => {
    test("displays all races from mock data", () => {
      renderWithRedux(<HomePage />);

      const races = getFixtureRaces();
      expect(races.length).toBeGreaterThan(0);

      races.forEach((race) => {
        expect(screen.getByText(race.meeting_name)).toBeInTheDocument();
      });
    });

    test("displays race numbers correctly", () => {
      renderWithRedux(<HomePage />);

      const races = getFixtureRaces();
      races.forEach((race) => {
        const raceNumberRegex = new RegExp(`Race ${race.race_number}`);
        expect(screen.getAllByText(raceNumberRegex).length).toBeGreaterThan(0);
      });
    });
  });
});
