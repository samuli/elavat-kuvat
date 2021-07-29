import { useRouter } from "next/router";

import Search from "@/pages/search";
import Fetcher from "@/lib/fetcher";
import {
  searchUrl,
  topicFacetsUrl,
  ISearchResult,
  IFacetResult,
} from "@/lib/api";
import { filterFacetFields, getSearchPageTitle, isServer } from "@/lib/util";

export async function getStaticPaths() {
  if (Boolean(process.env.NO_STATIC_EXPORT)) {
    return { paths: [], fallback: false };
  }

  // const records = await Fetcher(searchUrl('', 1));
  // const recordPages = Math.ceil(records.resultCount/searchLimit);
  // const base = '/browse/clips';
  // const paths = Array.from(Array(recordPages)).map((_, page) => {
  //   return `${base}/${page+1}`;
  // });
  return { paths: ["/browse/clips"], fallback: false };
}

export async function getStaticProps() {
  const records = await Fetcher(searchUrl("", 1));
  const topics = await Fetcher(topicFacetsUrl());
  const topicsFiltered = {
    ...topics,
    facets: {
      topic_facet:
        typeof topics.facets !== "undefined"
          ? filterFacetFields(topics.facets.topic_facet)
          : [],
    },
  };
  return { props: { records, topics: topicsFiltered } };
}

type PageProps = {
  records: ISearchResult;
  topics: IFacetResult;
};

const Clips = ({ records, topics }: PageProps) => {
  const router = useRouter();
  if (!isServer && !router.isReady) {
    return null;
  }
  const page = Number(router.query.page || 1);
  let pageTitle: string | undefined = getSearchPageTitle();
  return (
    <Search
      pageTitle={page == 1 ? pageTitle : undefined}
      initialPage={page}
      initialTopicFacets={topics}
      records={page == 1 ? records : undefined}
      queryKey="clips"
    />
  );
};

export default Clips;
