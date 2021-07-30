export const decades = [2000, 1990, 1980, 1970, 1960, 1950, 1940, 1930, 1920, 1910, 1900];

export const dateRange = (startYear: number): string =>
  `${startYear}-${startYear < 2000 ? startYear + 9 : '*'}`;
