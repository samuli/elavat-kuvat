import { useDebouncedCallback } from 'use-debounce';
import { useEffect } from 'react';
import Fetcher from '@/lib/fetcher';
import NProgress from "nprogress";
import { createClient } from '@supabase/supabase-js';

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
  return facets.map(f => `/browse/${facet}/${f.value}`);

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


export const getPageTitle = (title = null, resultPage = null) => {
  let pageTitle = `${appTitle} - ${appSubtitle}`;
  if (title) {
    pageTitle += ` | ${title}`;
  }
  if (resultPage && resultPage > 1) {
    pageTitle += `, sivu ${resultPage}`;
  }
  return pageTitle;
};

export const getSearchPageTitle = (lookfor = null, topic = null, genre = null, date = null, resultPage = null) => {
  let sub = null;
  if (lookfor) {
    sub = `hae: ${lookfor}`;
  } else if (topic) {
    sub = `aihe: ${topic}`;
  } else if (genre) {
    sub = `genre: ${genre}`;
  } else if (date) {
    sub = `aikakausi: ${yearTitle(date.split('-')[0])}`;
  }
  return getPageTitle(sub, resultPage ? Number(resultPage) : null);
}

export const trackPageView = async (tag) => {
  if (process.env.NEXT_PUBLIC_TRACK_PAGE_VIEW !== '1'  ) {
    return;
  }
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_KEY
  );
  const {} = await supabase.rpc('increment_tag', {
      tag_id: tag
  });
};

export const isServer = typeof window === 'undefined';
export const appUrl =  process.env.URL  || process.env.NEXT_PUBLIC_URL
  || 'https://www.elavatkuvat.fi';
