import { useDebouncedCallback } from 'use-debounce';
import { useEffect } from 'react';
import NProgress from "nprogress";

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

const facetMap = {
  'topic_facet': 'topic',
  'genre_facet': 'genre'
};

export const yearTitle = year => map[year];

export const facetSearchUrl = (facet, value) => `/search?${facetMap[facet]}=${encodeURIComponent(value)}`;
export const facetBrowseUrl = (facet, value) => `/browse/${facetMap[facet]}/${encodeURIComponent(value)}`;

export const filterFacetFields = facets => {
  return facets.map(item => {
    const { value, translated } = item;
    return { value, translated };
  });
};


export const useProgress = (isFetching, delay = 500) => {
  const showProgress = useDebouncedCallback(() => {
    NProgress.start();
  }, delay);

  useEffect(() => {
    showProgress.cancel();
    if (isFetching) {
      showProgress();
    } else {
      NProgress.done();
    }
  }, [isFetching]);
};
