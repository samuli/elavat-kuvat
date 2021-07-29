import { useRouter } from "next/router";

import Search from "@/pages/search";
import Fetcher from "@/lib/fetcher";
import {
  searchUrl,
  topicFacetsUrl,
  ISearchResult,
  IFacetResult,
} from "@/lib/api";
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

  const paths = await getStaticFacetPaths(topicFacetsUrl(), "topic");
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const topic = params.topic[0];
  const records = await Fetcher(searchUrl("", 1, topic));
  const topics = await Fetcher(topicFacetsUrl("", topic));
  const topicsFiltered = {
    ...topics,
    facets: {
      topic_facet:
        typeof topics.facets !== "undefined"
          ? filterFacetFields(topics.facets.topic_facet)
          : [],
    },
  };

  return { props: { topic, records, topics: topicsFiltered } };
}

type PageProps = {
  topic: string;
  records: ISearchResult;
  topics: IFacetResult;
};

export default function Topic({ topic, records, topics }: PageProps) {
  const router = useRouter();
  if (!isServer && !router.isReady) {
    return null;
  }
  const page = Number(router.query.page || 1);
  let pageTitle = getSearchPageTitle(undefined, topic);
  return (
    <Search
      pageTitle={page === 1 ? pageTitle : undefined}
      topicFacet={topic}
      initialPage={page}
      records={page === 1 ? records : undefined}
      initialTopicFacets={topics}
      queryKey="topic"
    />
  );
}

//export default Topic;
