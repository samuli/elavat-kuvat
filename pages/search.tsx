import { NextSeo } from "next-seo";
import clsx from "clsx";
import { useQuery } from "react-query";
import { useCallback, useState, useEffect } from "react";
import { useRouterScroll } from "@moxy/next-router-scroll";

import { SearchHeading } from "@/components/Typo";
import AppError from "@/components/AppError";
import { useRouter } from "next/router";
import {
  FaArrowLeft as ArrowLeft,
  FaArrowRight as ArrowRight,
} from "react-icons/fa";

import {
  searchUrl,
  searchLimit,
  topicFacetsUrl,
  ISearchResult,
  IFacetResult,
  TDaterange,
  TDaterangeEnd,
} from "@/lib/api";
import { ResultGrid } from "@/components/ImageGrid";
import { FacetStripe } from "@/components/Topics";
import {
  facetSearchUrl,
  yearTitle,
  useProgress,
  isServer,
  getSearchPageTitle,
  appUrl,
} from "@/lib/util";

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
      )}
    >
      {items.map((item: number, idx: number) => {
        const active = (activePage || 0) === item;
        return (
          <option key={idx} disabled={active} value={item}>
            Sivu {item}
          </option>
        );
      })}
    </select>
  );
};

const NaviButton = ({ children, onClick, disabled, small = false }) => (
  <div
    className={clsx(
      "flex justify-center items-center rounded-full border-gray-400",
      small && "text-xl",
      !small && "text-4xl",
      disabled && " text-gray-500",
      !disabled && "cursor-pointer active:text-pink-500 text-gray-100"
    )}
    onClick={() => {
      if (disabled) return;
      onClick();
    }}
  >
    {children}
  </div>
);

const Pagination = ({ page, pageCount, setPage, small = false }) => {
  const pageIdxs = Array.from(Array(pageCount), (_el, i) => i + 1);
  const scrollButtons = pageCount > 1;
  const disablePrev = page === 1;
  const disableNext = page === pageCount;
  return (
    <nav
      className="flex items-start items-center"
      aria-label={`Hakutuloksen sivutus${small ? "" : ", sivun lopussa"}`}
    >
      {scrollButtons && (
        <NaviButton
          disabled={disablePrev}
          aria-disabled={disablePrev}
          onClick={() => setPage(page - 1)}
          small={small}
        >
          <ArrowLeft />
        </NaviButton>
      )}
      <PageMenu
        activePage={page}
        items={pageIdxs}
        onPageSelect={(page) => setPage(page)}
        small={small}
      />
      {scrollButtons && (
        <NaviButton
          disabled={disableNext}
          aria-disabled={disableNext}
          onClick={() => setPage(page + 1)}
          small={small}
        >
          <ArrowRight />
        </NaviButton>
      )}
    </nav>
  );
};

const getPageCount = (results) => Math.ceil(Number(results) / searchLimit);

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

interface ISearchProps {
  topicFacet?: string;
  initialTopicFacets?: IFacetResult;
  genreFacet?: string;
  daterange?: string;
  records?: ISearchResult;
  initialPage?: number;
  queryKey?: string;
  queryValue?: string;
  pageTitle?: string;
}

const parseDaterange = (range: string): TDaterange => {
  const d = range.split("-");
  const start = Number(d[0]);
  let end: TDaterangeEnd = d[1] === "*" ? d[1] : Number(d[1]);
  return [start, end];
};

const Search = ({
  topicFacet,
  initialTopicFacets,
  genreFacet,
  daterange,
  records,
  initialPage,
  queryKey,
  queryValue,
  pageTitle,
}: ISearchProps) => {
  const router = useRouter();
  const { updateScroll } = useRouterScroll();

  const [lookfor, setLookfor] = useState<string | undefined>();

  const [daterangeFilter, setDaterangeFilter] = useState<
    TDaterange | undefined
  >(daterange ? parseDaterange(daterange) : undefined);
  const [topicFilter, setTopicFilter] = useState<string | undefined>(
    topicFacet
  );
  const [genreFilter, setGenreFilter] = useState<string | undefined>();

  const [page, setPage] = useState<number | null>(null);
  const [resultCount, setResultCount] = useState<number | undefined>();

  const currentPage =
    typeof router.query.page !== "undefined"
      ? Number(router.query.page)
      : initialPage || 1;

  setPage(currentPage);
  useEffect(() => {
    if (router.isReady) {
      let topic: string | undefined = undefined;
      if (router.query.topic) {
        topic = String(router.query.topic);
      }
      setTopicFilter(topic);

      let genre: string | undefined = undefined;
      if (router.query.genre) {
        genre = String(router.query.genre);
      }
      setGenreFilter(genre);

      let l = "";
      if (router.query.lookfor) {
        l = String(router.query?.lookfor);
      }
      setLookfor(l);

      if (router.query.daterange) {
        setDaterangeFilter(parseDaterange(String(router.query.daterange)));
      }
    }
  }, [router]);

  let { data, error, isFetching } = useQuery(
    searchUrl(
      lookfor || "",
      currentPage,
      topicFilter,
      genreFilter,
      daterangeFilter
    ),
    {
      enabled: true,
      initialData: records,
      refetchOnMount: typeof records === "undefined",
    }
  );

  const getResultPageUrl = useCallback(
    (idx) => {
      let path = "";
      if (topicFacet) {
        path = `/search?topic=${encodeURIComponent(topicFacet)}&page=${idx}`;
      } else if (genreFacet) {
        path = `/search?genre=${encodeURIComponent(genreFacet)}&page=${idx}`;
      } else if (daterange) {
        path = `/search?date=${encodeURIComponent(daterange)}&page=${idx}`;
      } else if (queryValue) {
        path = `/search?${queryKey}=${encodeURIComponent(
          queryValue
        )}&page=${idx}`;
      }
      return path;
    },
    [queryKey, queryValue, topicFacet, genreFacet, daterange]
  );

  useProgress(isFetching);

  const { data: topicFacets, isFetching: isFetchingTopics } = useQuery(
    topicFacetsUrl(lookfor || "", topicFilter, genreFilter, daterangeFilter),
    {
      enabled:
        isServer ||
        typeof initialTopicFacets !== "undefined" ||
        (typeof lookfor !== "undefined" && typeof page !== "undefined"),
      initialData: initialTopicFacets,
      refetchOnMount: typeof initialTopicFacets === "undefined",
    }
  );

  const recordData = records || data;
  const _resultCount = resultCount || recordData?.resultCount || 0;
  const pageCount = getPageCount(_resultCount);
  const topicFacetData = initialTopicFacets || topicFacets;

  useEffect(() => {
    updateScroll();
  }, [updateScroll]);

  useEffect(() => {
    setResultCount(_resultCount);
  }, [_resultCount]);

  useEffect(() => {
    if (page && pageCount) {
      if (!isFetching && page + 1 > 1 && page < pageCount - 1) {
        router.prefetch(getResultPageUrl(page + 1));
      }
    }
  }, [router, isFetching, getResultPageUrl, page, pageCount]);
  useEffect(() => setPage(Number(router.query.page)), [router.query.page]);

  if (!isServer && !router.isReady) {
    return null;
  }

  const changePage = (idx: number) => {
    scrollToTop();
    router.query.page = String(idx);
    router.push(router);
  };

  const isFaceted = topicFacet || genreFacet;
  const browseAll = queryKey === "clips";
  const seoTitle =
    pageTitle ||
    getSearchPageTitle(lookfor, topicFacet, genreFacet, daterange, currentPage);

  const getPagination = (small = false) =>
    pageCount > 1 && (
      <div className="">
        <Pagination
          page={page}
          pageCount={pageCount}
          setPage={(page: number) => changePage(page)}
          small={small}
        />
      </div>
    );

  const getHeading = (title: string, value?: string, placeholder?: boolean) => {
    return (
      <div className="flex items-center justify-between">
        <SearchHeading
          title={title}
          value={value}
          placeholder={placeholder}
          resultCount={_resultCount ? _resultCount : undefined}
        />
        {getPagination(true)}
      </div>
    );
  };

  return (
    <>
      <NextSeo
        title={seoTitle}
        noindex={router.asPath.indexOf("/search") === 0}
        nofollow={true}
        openGraph={{
          title: seoTitle,
          url: `${appUrl}${router.asPath}`,
        }}
      />
      <div className="w-full font-sans">
        <div className="pt-2 w-full">
          <div className="flex flex-col flex-wrap md:flex-nowrap">
            <div className="h-8">
              {topicFilter && getHeading("Aihe", topicFilter)}
              {genreFilter && getHeading("Genre", genreFilter)}
              {daterangeFilter &&
                getHeading("Aikakausi", yearTitle(daterangeFilter[0]))}
              {browseAll && getHeading("Selaa elokuvia")}
              {!isFaceted &&
                !browseAll &&
                !daterange &&
                lookfor &&
                getHeading("Haku", lookfor || undefined, !lookfor)}
            </div>
            {(isFetchingTopics || (topicFacetData?.resultCount || 0) > 0) && (
              <div className="h-16 min-h-32 w-full mt-1 mb-3">
                {topicFacets?.status === "OK" && (
                  <FacetStripe
                    facet="topic_facet"
                    facets={(topicFacetData?.facets?.topic_facet || []).filter(
                      (f) => f.value !== topicFacet
                    )}
                    facetUrl={facetSearchUrl}
                    truncate={true}
                  />
                )}
              </div>
            )}
          </div>
        </div>
        <div className="mt-6">
          {!isFetching && (error || (data && data?.status === "ERROR")) && (
            <AppError />
          )}
          {!isFetching && data && Number(_resultCount) === 0 && (
            <h1>
              Ei tuloksia haulla <span className="font-normal">{lookfor}</span>
            </h1>
          )}
          {recordData?.status === "OK" && (
            <ResultGrid records={recordData?.records || []} />
          )}
        </div>
        <div className="flex justify-center mt-6">
          {!isFetching && getPagination(false)}
        </div>
      </div>
    </>
  );
};

export default Search;
