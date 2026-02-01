import { render, screen } from "@testing-library/react";

import { apiSampleData } from "@/__fixtures__/api.data";
import type { RaceSummary } from "@/types/races";
import { RaceCard } from "./RaceCard";

const baseRace = (overrides?: Partial<RaceSummary>): RaceSummary => ({
  ...apiSampleData.data.race_summaries["1201232f-4be0-46a5-816e-017bc348c91f"],
  ...overrides,
});

// Mock child components so tests focus on RaceCard rendering
jest.mock("./RaceTimer", () => ({
  RaceTimer: () => <div data-testid="race-timer" />,
}));

jest.mock("./RaceDetails", () => ({
  RaceDetails: ({ race }: { race: RaceSummary }) => (
    <div data-testid="race-details">{race?.race_form?.race_comment ?? ""}</div>
  ),
}));

describe("RaceCard", () => {
  test("renders nothing when no race provided", () => {
    const { container } = render(<RaceCard />);
    expect(container.firstChild).toBeNull();
  });

  test("renders header, venue, weather icon and details", () => {
    const race = baseRace();
    render(<RaceCard race={race} />);

    expect(screen.getByText(/Di Battista Real Estate/)).toBeInTheDocument();
    expect(screen.getByText(/Race 4 • 730m/)).toBeInTheDocument();

    expect(screen.getByText(race.venue_name)).toBeInTheDocument();
    expect(screen.getByText(/VIC, AUS/)).toBeInTheDocument();

    expect(screen.getByText("water_drop")).toBeInTheDocument();
    expect(
      screen.getByText(race.race_form.weather!.short_name),
    ).toBeInTheDocument();

    expect(screen.getByTestId("race-timer")).toBeInTheDocument();
    expect(screen.getByTestId("race-details")).toBeInTheDocument();
  });
});
