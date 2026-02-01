import { apiSampleData } from "@/__fixtures__/api.data";
import { render, screen } from "@testing-library/react";
import type { RaceSummary } from "../types/races";
import { RaceDetails } from "./RaceDetails";

const baseRace = (overrides?: Partial<RaceSummary>): RaceSummary => ({
  ...apiSampleData.data.race_summaries["1201232f-4be0-46a5-816e-017bc348c91f"],
  ...overrides,
});

describe("RaceDetails", () => {
  test("renders race preview when comment exists", () => {
    const race = baseRace();
    render(<RaceDetails race={race} />);

    expect(screen.getByText(/Race Preview/i)).toBeInTheDocument();
    expect(screen.getByText(race.race_form.race_comment)).toBeInTheDocument();
    expect(screen.getByText("Distance")).toBeInTheDocument();
    expect(screen.getByText("730m")).toBeInTheDocument();
    expect(screen.getByText("Track")).toBeInTheDocument();
    expect(screen.getByText(/good/i)).toBeInTheDocument();
  });

  test("does not render preview when comment is empty", () => {
    const race = baseRace({
      race_form: { ...baseRace().race_form, race_comment: "" },
    });
    render(<RaceDetails race={race} />);

    expect(screen.queryByText(/Race Preview/i)).not.toBeInTheDocument();
    expect(screen.getByText("730m")).toBeInTheDocument();
  });
});
