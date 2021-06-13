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

const Pagination = ({ results, page, setPage, loading, limit = 10 }) => {
  const pages = Math.ceil(Number(results)/limit);
  if (pages === 1) return null;
  const maxItems = 7;
  const startPage = Math.max(0, Math.floor(page-maxItems/2));
  const endPage = Math.min(pages-1, Math.floor(page+maxItems/2));
  const scrollButtons = pages > maxItems;
  const buttons = Math.min(pages, 6);
  let pageIdxs = Array.from(new Array(buttons), (x, i) => i + startPage);
  const addFirstPage = pageIdxs[0] > 0;
  const showEllipsis = pageIdxs[0] > 1;
  if (addFirstPage) {
    pageIdxs = [0, ...pageIdxs];

  }

  return (
    <div className="flex items-start items-center -ml-2">
      { scrollButtons && <div onClick={() => setPage(page-1)}><ArrowLeft /></div> }
      <ul className="flex items-start flex-wrap gap-4 mx-4">
        { pageIdxs.map((el,i) => {

          const pageIdx = el;
          const active = pageIdx+1 === page;
          return (
            <li key={pageIdx} className="flex">
              <div
                onClick={() => setPage(pageIdx+1)}

                className={clsx(
                  'flex justify-center items-center w-12 h-12 p-2 ring-1 ring-pink-500 text-gray-200 text-xl rounded-sm',
                  !active && 'hover:text-white cursor-pointer',
                  active && 'bg-pink-500 text-white hover:text-white')}>{ loading && active ? <Spinner width="6" height="6"/> : pageIdx+1 }
              </div>
              { showEllipsis && i === 0 && <div className="flex ml-4 text-2xl tracking-widest justify-center items-end">...</div> }
            </li>);
      }) }
      </ul>
      { scrollButtons && <div onClick={() => setPage(page+1)}><ArrowRight /></div> }
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

const SearchHeading = ({title, value, results}) => <h1 className="-ml-2 text-4xl mx-text 2-500-pink">{title}: <span className="text-gray-200">{value}{ results ? <span className="ml-3 text-gray-400">({results} klippiä)</span> : ''}</span></h1>;


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

  const { data, error } = useStickySWR(typeof nextLookfor !== 'undefined' ? searchUrl(nextLookfor, page, topicFacet, genreFacet) : null, Fetcher, opt);
//  const { data } = useSWR(mounted && currentLookfor ? searchUrl(currentLookfor, page) : null, Fetcher, opt);

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

  const resultCount = data?.resultCount || null;
  const isFaceted = topicFacet || genreFacet;

  const getPagination = () => data && <Pagination results={resultCount} page={page} setPage={(page) => changePage(page)} loading={loading} limit={searchLimit} />;

  return (
    <div className="w-full font-sans">
      <HeadTags />
      <div className="p-5 w-full">
        <div className="flex flex-col gap-y-4 flex-wrap md:flex-nowrap">
          { topicFacet && <SearchHeading title="Aihe" value={topicFacet} results={resultCount} /> }
          { genreFacet && <SearchHeading title="Genre" value={genreFacet} results={resultCount} /> }
          { !isFaceted && <SearchHeading title="Hakusana" value={currentLookfor} results={resultCount}/> }
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
      <div className="">
        { !loading && getPagination()}
      </div>
    </div>
  )
}
