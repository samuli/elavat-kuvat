import { useRouter } from "next/router";

import Search from "@/pages/search";
import Fetcher from "@/lib/fetcher";
import {
  searchUrl,
  genreFacetsUrl,
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

  const paths = await getStaticFacetPaths(genreFacetsUrl, "genre");
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const genre = params.genre[0];

  const topics = await Fetcher(topicFacetsUrl("", undefined, genre));
  const records = await Fetcher(searchUrl("", 1, undefined, genre));

  const topicsFiltered = {
    ...topics,
    facets: {
      topic_facet:
        typeof topics.facets !== "undefined"
          ? filterFacetFields(topics.facets.topic_facet)
          : [],
    },
  };
  return { props: { records, genre, topics: topicsFiltered } };
}

type PageProps = {
  genre: string;
  records: ISearchResult;
  topics: IFacetResult;
};

const Genre = ({ records, genre, topics }: PageProps) => {
  const router = useRouter();
  if (!isServer && !router.isReady) {
    return null;
  }
  const page = Number(router.query?.page || 1);
  let pageTitle = getSearchPageTitle(undefined, undefined, genre);
  return (
    <Search
      pageTitle={page === 1 ? pageTitle : undefined}
      genreFacet={genre}
      initialPage={page}
      records={page === 1 ? records : undefined}
      initialTopicFacets={topics}
      queryKey="genre"
    />
  );
};

export default Genre;
