import { useRouter } from "next/router";

import Search from "@/pages/search";
import Fetcher from "@/lib/fetcher";
import {
  searchUrl,
  topicFacetsUrl,
  yearFacetsUrl,
  ISearchResult,
  IFacetResult,
} from "@/lib/api";
import { decades, dateRange } from "@/components/DecadeFilter";
import {
  filterFacetFields,
  getStaticFacetPaths,
  isServer,
  getSearchPageTitle,
} from "@/lib/util";

export async function getStaticPaths() {
  if (Boolean(process.env.NO_STATIC_EXPORT)) {
    return { paths: [], fallback: false };
  }

  const facets = decades.map((startYear) => {
    return { value: dateRange(startYear), translated: "" };
  });

  const paths = await getStaticFacetPaths(yearFacetsUrl, "date", facets);
  /* (daterange) => searchUrl("", 1, undefined, undefined, daterange.split("-")),
   *   "date",
   *   facets
     );
   */
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const daterange = params.date[0];
  const rangeYears = daterange.split("-");
  const records = await Fetcher(
    searchUrl("", 1, undefined, undefined, rangeYears)
  );
  const topics = await Fetcher(
    topicFacetsUrl("", undefined, undefined, rangeYears)
  );
  const topicsFiltered = {
    ...topics,
    facets: {
      topic_facet:
        typeof topics.facets !== "undefined"
          ? filterFacetFields(topics.facets.topic_facet)
          : [],
    },
  };
  return { props: { daterange, records, topics: topicsFiltered } };
}

type PageProps = {
  daterange: string;
  records: ISearchResult;
  topics: IFacetResult;
};

const Date = ({ daterange, records, topics }: PageProps) => {
  const router = useRouter();
  if (!isServer && !router.isReady) {
    return null;
  }
  const page = Number(router.query.page || 1);
  let pageTitle = getSearchPageTitle(
    undefined,
    undefined,
    undefined,
    daterange
  );
  return (
    <Search
      pageTitle={page === 1 ? pageTitle : undefined}
      daterange={daterange}
      initialPage={page}
      records={page === 1 ? records : undefined}
      initialTopicFacets={topics}
      queryKey="date"
    />
  );
};

export default Date;
