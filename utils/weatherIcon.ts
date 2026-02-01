export const weatherIcon = (iconUri: string) =>
  iconUri === "Fine"
    ? "wb_sunny"
    : iconUri === "Overcast"
      ? "cloud"
      : "water_drop";
