

const map = {
  1900: '1900-',
  1910: '1910-',
  1920: '1920-',
  1930: '1930-',
  1940: '1940-',
  1950: "1950-",
  1960: "1960-",
  1970: "1970-",
  1980: "1980-",
  1990: "1990-",
  2000: "2000-"
};

export const yearTitle = year => map[year];

export const facetSearchUrl = (facet, value) => `/search?${facet}=${encodeURIComponent(value)}`;
