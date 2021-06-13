import clsx from 'clsx';
import useSWR from 'swr';
import { useRef, useState, useEffect } from 'react';
import { useUpdate } from 'react-use';
import { useQuery } from 'react-query';
import HeadTags from '@/components/Head';
import Fetcher from '@/lib/fetcher';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { FaHourglassHalf, FaSearch } from 'react-icons/fa';
import { FcNext } from 'react-icons/fc';
import { FaArrowLeft as ArrowLeft, FaArrowRight as ArrowRight } from 'react-icons/fa';

import { searchUrl, searchLimit } from '@/lib/api';
import { ResultGrid } from '@/components/ImageGrid';
import Spinner from '@/components/Spinner';
import { yearTitle } from '@/lib/util';

const useStickySWR = (...args) => {
  const val = useRef();
  const { data, error, loading, ...rest } = useSWR(...args);

  if (data !== undefined) {
    val.current = data;
  }

  return {
    ...rest,
    loading,
    error,
    data: val.current,
  };
};

const PageMenu = ({ items, activePage, onPageSelect }) => {
  return (
    <select
      onChange={(e) => onPageSelect(e.target.value)}
      value={activePage}
      className="appearance-none w-auto pl-4 pr-10 py-3 border bg-gray-100 border-gray-400 rounded-md text-xl text-gray-900 cursor-pointer">
      { items.map((item, idx) => {
        const active = activePage === item;
        return <option key={idx} disabled={active} value={item}>Sivu {item}</option>;
      })}
    </select>
  );
};

const NaviButton = ({ children, onClick, disabled }) => (
  <div className={clsx(
    "w-16 h-16 flex justify-center items-center text-4xl rounded-full border-gray-400",
    disabled && " text-gray-500",
    !disabled && "cursor-pointer hover:text-pink-500 text-gray-100")}
       onClick={() => {
         if (disabled) return;
         onClick()
       }}>
    {children}</div>
);

const Pagination = ({ results, page, setPage, loading, showResultCount, limit = 10 }) => {
  const pages = Math.ceil(Number(results)/limit);
  if (pages === 1) return null;

  const pageIdxs = Array.from(Array(pages), (_el,i) => i+1);
  const scrollButtons = pages > 1;

  return (
    <div className="flex items-start items-center -ml-2">
      { scrollButtons && <NaviButton disabled={page === 1} onClick={() => setPage(page-1)}><ArrowLeft /></NaviButton> }
      <PageMenu activePage={page} items={pageIdxs} onPageSelect={(page) => setPage(page)}/>
      { scrollButtons && <NaviButton disabled={page === pages} onClick={() => setPage(page+1)}><ArrowRight /></NaviButton> }
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

const SearchHeading = ({title, value, results}) => (
  <h1 className="text-4xl mx-text 2-500-pink font-bold">
    {title}: <span className="ml-1 font-normal text-gray-200">{value}</span>
  </h1>
);


let mounted = false

export default function Home() {
  const router = useRouter();

  const [ lookfor, setLookfor ] = useState(router.query.lookfor);
  const [ currentLookfor, setCurrentLookfor ] = useState(lookfor);
  const [ nextLookfor, setNextLookfor ] = useState(lookfor);
  const [ page, setPage ] = useState(Number(router.query.page));
  const [ resetScroll, setResetScroll ] = useState(false);

  const [ loading, setLoading ] = useState(false);
  const opt = {
    loadingTimeout: 10,
    onLoadingSlow: (_key, _config) => {
      setLoading(true);
    },
    onError: (_err, _key, config) => {
      setLoading(false);
      setCurrentLookfor(nextLookfor);
    },
    onSuccess: (_data, _key, _config) => {
      setLoading(false);
      setCurrentLookfor(nextLookfor);
      if (resetScroll) {
        window.scrollTo(0,0);
        setResetScroll(false);
      }
    }
  };
  const topicFacet = router.query?.topic_facet;
  const genreFacet = router.query?.genre_facet;
  const daterange = router.query?.date;
  let rangeYears = daterange && daterange.split('-') || null;

  const { data, error } = useStickySWR(typeof nextLookfor !== 'undefined'
    ? searchUrl(nextLookfor, page, topicFacet, genreFacet, rangeYears) : null,
    Fetcher, opt
  );

  const queryUpdated = () => {
    const l = router.query.lookfor ?? '';
    setLookfor(l);
    setNextLookfor(l);
    setPage(Number(router.query.page ?? 1));
  };

  useEffect(() => {
    if (!router.isReady) {
      return;
    }
    queryUpdated();
  }, [router.isReady, router.query]);


  const search = () => {
    setLoading(false);
    router.query.page = 1;
    router.query.lookfor = lookfor;
    router.push(router);
  };

  const changePage = (page) => {
    setLoading(false);
    setResetScroll(true);
    router.query.page = page;
    router.push(router);
  };

  const openRecord = (id) => {
    router.push(`/view?id=${encodeURIComponent(id)}`);
  };

  const resultCount = data && data.resultCount || 0;
  const isFaceted = topicFacet || genreFacet;

  const getPagination = (showResultCount = true) => data && resultCount > 0 &&
    <Pagination results={resultCount} page={page} setPage={(page) => changePage(page)}
                loading={loading} showResultCount={showResultCount} limit={searchLimit} />;

  return (
    <div className="w-full font-sans">
      <HeadTags />
      <div className="p-5 w-full">
        <div className="flex flex-col flex-wrap md:flex-nowrap">
          { topicFacet && <SearchHeading title="Aihe" value={topicFacet} results={resultCount} /> }
          { genreFacet && <SearchHeading title="Genre" value={genreFacet} results={resultCount} /> }
          { daterange && <SearchHeading title="Aikakausi" value={yearTitle(rangeYears[0])} results={resultCount} /> }
          { !isFaceted && !daterange &&
            <div className="mb-4"><SearchHeading title="Hakusana" value={currentLookfor} results={resultCount}/></div> }

          { data && getPagination()}
        </div>
      </div>
      <div className="p-5">
        { loading && <div className="ml-4 w-8 h-8"><Spinner /></div> }
        { !loading && error && <p>error...</p> }
        { !loading && data && data?.status === 'ERROR' && <p>error...</p> }
        { !loading && data && resultCount === 0 && <p>ei tuloksia...</p> }
        { !loading && data?.status === 'OK' && <ResultGrid records={data.records} onOpenRecord={openRecord} width="200" height="200"/> }
      </div>
      <div className="flex justify-center">
        { !loading && getPagination(false)}
      </div>
    </div>
  )
}
