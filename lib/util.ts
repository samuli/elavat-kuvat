import { createClient } from '@supabase/supabase-js';
import NProgress from "nprogress";
import { useEffect } from 'react';
import { useDebouncedCallback } from 'use-debounce';

import { IFacet, IFacetResult } from '@/lib/api';
import Fetcher from '@/lib/fetcher';


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

export const yearTitle = (year: number): string => map[year];

export const facetSearchUrl = (facet: string, value: string): string => `/search?${facetMap[facet]}=${encodeURIComponent(value)}`;
export const facetBrowseUrl = (facet: string, value: string): string => `/browse/${facetMap[facet]}/${encodeURIComponent(value).replace(/äöööö/g, '+')}`;


export const filterFacetFields = (facets: IFacet[]): IFacet[] => {
  return facets.map(item => {
    const { value, translated } = item;
    return { value, translated };
  });
};

export const useProgress = (isFetching: boolean, delay = 500): void => {
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
  }, [isFetching, showProgress]);
};

export const getStaticFacetPaths = async (facetUrl: string, facet: string, facets: IFacet[] = []): Promise<string[]> => {
  if (typeof facets === 'undefined' || facets.length === 0) {
    const data = await Fetcher(facetUrl) as IFacetResult;
    facets = typeof data.facets !== 'undefined' ? data.facets[`${facet}_facet`] : [];
  }

  return facets.map((f: IFacet) => `/browse/${facet}/${f.value}`);

  // let paths = [];
  // await Promise.all(facets.map(async ({value}) => {
  //   const records = await Fetcher(recordSearchUrl(value));
  //   const recordPages = Math.ceil(records.resultCount/searchLimit);
  //   const base = `/browse/${facet}/${value}`;
  //   let facetPaths = Array.from(Array(recordPages)).map((_, page) => {
  //     return `${base}/${page+1}`;
  //   });
  //   facetPaths = facetPaths.concat(base);
  //   paths = paths.concat(facetPaths);
  // }));

  // return paths;
};

export const appTitle = "Elävät kuvat";
export const appSubtitle = "suomalaisia lyhytelokuvia";


export const getPageTitle = (title?: string, resultPage?: number): string => {
  let pageTitle = `${appTitle} - ${appSubtitle}`;
  if (title) {
    pageTitle += ` | ${title}`;
  }
  if (resultPage && resultPage > 1) {
    pageTitle += `, sivu ${resultPage}`;
  }
  return pageTitle;
};

export const getSearchPageTitle = (lookfor?: string, topic?: string, genre?: string, date?: string, resultPage?: number): string => {
  let sub = '';
  if (lookfor) {
    sub = `hae: ${lookfor}`;
  } else if (topic) {
    sub = `aihe: ${topic}`;
  } else if (genre) {
    sub = `genre: ${genre}`;
  } else if (date) {
    sub = `aikakausi: ${yearTitle(Number(date.split('-')[0]))}`;
  }
  return getPageTitle(sub, resultPage);
}

export const trackPageView = async (tag: string): Promise<void> => {
  if (process.env.NEXT_PUBLIC_TRACK_PAGE_VIEW !== '1') {
    return;
  }
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.NEXT_PUBLIC_SUPABASE_KEY || ''
  );
  const { } = await supabase.rpc('increment_tag', {
    tag_id: tag
  });
};

export const isServer = typeof window === 'undefined';
export const appUrl = process.env.URL || process.env.NEXT_PUBLIC_URL
  || 'https://www.elavatkuvat.fi';
