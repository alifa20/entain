import { weatherIcon } from "./weatherIcon";

describe("weatherIcon", () => {
  test("returns 'wb_sunny' when weather.icon_uri is Fine", () => {
    expect(weatherIcon("Fine")).toBe("wb_sunny");
  });

  test("returns 'cloud' when weather.icon_uri is Overcast", () => {
    expect(weatherIcon("Overcast")).toBe("cloud");
  });

  test("returns 'water_drop' for other weather.icon_uri values", () => {
    expect(weatherIcon("Rain")).toBe("water_drop");
  });
});
