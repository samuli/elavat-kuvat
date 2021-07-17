import { NextSeo } from 'next-seo';
import clsx from 'clsx';
import { useQuery } from 'react-query';
import { useCallback, useRef, useState, useEffect } from 'react';
import { useUpdate } from 'react-use';
import { forceCheck } from 'react-lazyload';
import { useRouterScroll } from '@moxy/next-router-scroll';
import HeadTags from '@/components/Head';
import Select from '@/components/Select';

import { SearchHeading } from '@/components/Typo';
import AppError from '@/components/AppError';
import Fetcher from '@/lib/fetcher';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { FaHourglassHalf, FaSearch } from 'react-icons/fa';
import { FcNext } from 'react-icons/fc';
import { FaArrowLeft as ArrowLeft, FaArrowRight as ArrowRight } from 'react-icons/fa';

import { searchUrl, searchLimit, topicFacetsUrl } from '@/lib/api';
import { ResultGrid } from '@/components/ImageGrid';
import { FacetStripe } from '@/components/Topics';
import { facetSearchUrl, yearTitle, useProgress, isServer, getSearchPageTitle } from '@/lib/util';

const PageMenu = ({ items, activePage = 1, onPageSelect, small = false }) => {
  return (
    <select
      aria-label="Siirry sivulle"
      onChange={(e) => onPageSelect(e.target.value)}
      value={activePage}
      className={clsx(
        "-appearance-none outline-none w-auto border bg-gray-100 border-gray-400 rounded-md text-gray-900 cursor-pointer",
        !small && "mx-3 px-3 py-2 text-md",
        small && "mx-1 px-1 py-1 text-xs"
      )}>
      { items.map((item, idx) => {
        const active = activePage === item;
        return <option key={idx} disabled={active} value={item}>Sivu {item}</option>;
      })}
    </select>
  );
};

const NaviButton = ({ children, onClick, disabled, small = false }) => (
  <div className={clsx(
    "flex justify-center items-center rounded-full border-gray-400",
    small && "text-xl",
    !small && "text-4xl",
    disabled && " text-gray-500",
    !disabled && "cursor-pointer active:text-pink-500 text-gray-100")}
       onClick={() => {
         if (disabled) return;
         onClick()
       }}>
    {children}</div>
);

const Pagination = ({ results, page, pageCount, setPage, loading, showResultCount, small = false }) => {
  const pageIdxs = Array.from(Array(pageCount), (_el,i) => i+1);
  const scrollButtons = pageCount > 1;

  return (
    <div className="flex items-start items-center">
      { scrollButtons && <NaviButton disabled={page === 1} onClick={() => setPage(page-1)} small={small}><ArrowLeft /></NaviButton> }
      <PageMenu activePage={page} items={pageIdxs} onPageSelect={(page) => setPage(page)} small={small}/>
      { scrollButtons && <NaviButton disabled={page === pageCount} onClick={() => setPage(page+1)} small={small}><ArrowRight /></NaviButton> }
      { showResultCount && <div className="ml-5 text-xl text-gray-200">({results} klippiä)</div> }
    </div>
   );
};

const Results = ({ data }) => (
  <div>
    {data?.status === 'OK' &&
     <>
       <ul>
        {data.records?.map(rec => (
          <a key={rec.id} className="text-blue-500 hover:text-blue-600 hover:underline" target="_blank" href={`https://finna.fi${rec.recordPage}`}>
            <li className="mt-2">{`${rec.title} - ${rec.id}`}</li>
          </a>))}
      </ul>
     </>}
  </div>
);

const getPageCount = (results) => Math.ceil(Number(results)/searchLimit);

export default function Search({
  topicFacet = null, initialTopicFacets = null, genreFacet = null, daterange = null, records = null, initialPage = null,
  queryKey = null, queryValue = null, pageTitle
}) {

  const router = useRouter();
  const { updateScroll } = useRouterScroll();

  const [ lookfor, setLookfor ] = useState(null);
  const [ currentLookfor, setCurrentLookfor ] = useState(null);
  const [ nextLookfor, setNextLookfor ] = useState(null);

  const [ page, setPage ] = useState(null);
  const [ resetScroll, setResetScroll ] = useState(false);
  const [ loading, setLoading ] = useState(false);
  const [ resultCount, setResultCount ] = useState(records ? records.resultCount : null);
  const [ pageCount, setPageCount ] = useState(records ? getPageCount(records.resultCount) : null);

  const forceCheckRef = useRef();

  if (!isServer && !router.isReady) {
    return '';
  }

  const currentPage = typeof router.query.page !== 'undefined' ? Number(router.query.page) : initialPage || 1;
  setPage(currentPage);
  const queryLookfor = router.query.lookfor;
  setLookfor(queryLookfor);
  setCurrentLookfor(queryLookfor);
  setNextLookfor(queryLookfor);

  const onError = (_e) => {
    setLoading(false);
    setCurrentLookfor(nextLookfor);
  };
  const onSuccess = (data) => {
    setLoading(false);
    setCurrentLookfor(nextLookfor);
    setResultCount(data.resultCount || 0);
    setPageCount(getPageCount(data.resultCount));

    if (resetScroll) {
      window.scrollTo(0,0);
      setResetScroll(false);
    }
    if (forceCheckRef.current) {
      clearTimeout(forceCheckRef.current);
    }
    forceCheckRef.current = setTimeout(() => forceCheck(), 100);
  };

  daterange = daterange || router.query?.date;
  let rangeYears = daterange && daterange.split('-') || null;
  topicFacet = topicFacet || router.query?.topic;
  genreFacet = genreFacet || router.query?.genre;

  let { data, status, error, isFetching } = useQuery(
    searchUrl(queryLookfor || "", currentPage, topicFacet, genreFacet, rangeYears),
    { enabled: records === null,
      onError, onSuccess, keepPreviousData: true,
      initialData: records,
    }
  );
  if (records !== null) {
    data = records;
  }

  useEffect(() => setLoading(isFetching), [isFetching]);
  useProgress(isFetching);

  const { data: topicFacets } = useQuery(
    topicFacetsUrl(queryLookfor || "", topicFacet, genreFacet, rangeYears),
    {
      enabled: typeof page !== 'undefined',
      initialData: initialTopicFacets,
      refetchOnMount: initialTopicFacets === null
    }
  );


  useEffect(() => {
    updateScroll();
  }, []);

  const search = () => {
    setLoading(false);
    router.query.page = 1;
    router.query.lookfor = lookfor;
    router.push(router);
  };

  const getResultPageUrl = (idx) => {
    let path = null;
    if (queryKey && queryValue) {
      path = `/search?${queryKey}=${encodeURIComponent(queryValue)}&page=${idx}`;
    } else if (topicFacet) {
      path = `/search?topic=${encodeURIComponent(topicFacet)}&page=${idx}`;
    } else if (genreFacet) {
      path = `/search?genre=${encodeURIComponent(genreFacet)}&page=${idx}`;
    } else if (daterange) {
      path = `/search?date=${encodeURIComponent(daterange)}&page=${idx}`;
    }
    return path;
  }
  const changePage = (idx) => {
    setLoading(false);
    setResetScroll(true);

    const path = getResultPageUrl(idx);
    router.query.page = idx;
    router.push(router);
  };

  useEffect(() => {
    if (!isFetching && page+1 > 1 && page < pageCount-1) {
      router.prefetch(getResultPageUrl(page+1));
    }
  }, [page, isFetching]);
  useEffect(() => setPage(Number(router.query.page)), [router.query.page]);

  const facetClick = (facet, value) => {
    router.push(`/search?${facet}=${encodeURIComponent(value)}`);
  };

  const _topicFacets = initialTopicFacets || topicFacets;
  const isFaceted = topicFacet || genreFacet;
  const getPagination = (small = false, showResultCount = true) => pageCount > 1 && (
    <div className="">
      <Pagination results={resultCount} page={page} pageCount={pageCount} setPage={(page) => changePage(page)}
                  loading={loading} showResultCount={showResultCount} limit={searchLimit} small={small} />
    </div>
  );

  const getHeading = (title, value, placeholder) => {
    if (resultCount === 0) return "";
    return (
      <div className="flex items-center justify-between">
        <SearchHeading title={title} value={value} placeholder={placeholder} resultCount={resultCount} />
        { getPagination(true, false) }
      </div>
    );
  };
  return (
    <>
     <NextSeo
      title={pageTitle || getSearchPageTitle(currentLookfor, topicFacet, genreFacet, daterange, currentPage)}
      noindex={router.asPath.indexOf('/search') === 0} nofollow={true}
     />
    <div className="w-full font-sans">
      {/* <HeadTags title={pageTitle || getPageTitle(currentLookfor, topicFacet, genreFacet, daterange)} resultPage={page}/> */}
      <div className="pt-2 w-full">
        <div className="flex flex-col flex-wrap md:flex-nowrap">
          { topicFacet && getHeading("Aihe", topicFacet) }
          { genreFacet && getHeading("Genre", genreFacet) }
          { daterange && getHeading("Aikakausi", yearTitle(rangeYears[0])) }
          { !isFaceted && !daterange &&
            <div className="">{getHeading("Haku", currentLookfor, !currentLookfor)}</div> }
          { (isFetching || resultCount > 0) &&
            <div className="h-16 min-h-32 w-full mt-1 mb-3">
              { _topicFacets?.status === 'OK' && resultCount > 0 && <FacetStripe facet="topic_facet" facets={_topicFacets.facets.topic_facet.filter(f => f.value !== topicFacet)} facetUrl={facetSearchUrl} truncate={true} /> }
            </div>
          }

        </div>
      </div>
      <div className="mt-6">
        { !isFetching && (error || data && data?.status === 'ERROR') && <AppError /> }
        { !isFetching && data && Number(resultCount) === 0 && <h1>Ei tuloksia haulla <span className="font-normal">{queryLookfor}</span></h1> }
        { data?.status === 'OK' && <ResultGrid records={data.records} /> }
      </div>
      <div className="flex justify-center">
        { !isFetching && getPagination(false, false)}
      </div>
    </div>
    </>
  )
}
