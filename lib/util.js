import { useDebouncedCallback } from 'use-debounce';
import { useEffect } from 'react';
import { searchUrl, searchLimit } from '@/lib/api';
import Fetcher from '@/lib/fetcher';
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

export const getStaticFacetPaths = async (facetUrl, recordSearchUrl, facet, facets = null) => {
  if (facets === null) {
    const data = await Fetcher(facetUrl);
    facets = data?.facets[`${facet}_facet`] || [];
  }

  let paths = [];
  await Promise.all(facets.map(async ({value}) => {
    const records = await Fetcher(recordSearchUrl(value));
    const recordPages = Math.ceil(records.resultCount/searchLimit);
    const base = `/browse/${facet}/${value}`;
    let facetPaths = Array.from(Array(recordPages)).map((_, page) => {
      return `${base}/${page+1}`;
    });
    facetPaths = facetPaths.concat(base);
    paths = paths.concat(facetPaths);
  }));

  return paths;
};

export const isServer = typeof window === 'undefined';
