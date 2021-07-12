import { useRouter } from 'next/router';

import Search from '@/pages/search';
import Fetcher from '@/lib/fetcher';
import { searchUrl, genreFacetsUrl, topicFacetsUrl } from '@/lib/api';
import { filterFacetFields, getStaticFacetPaths, isServer } from '@/lib/util';

export async function getStaticPaths() {
  if (Boolean(process.env.NO_STATIC_EXPORT)) {
    return { paths: [], fallback: false };
  }

  const paths = await getStaticFacetPaths(
    genreFacetsUrl,
    genre => searchUrl('', 1, null, genre),
    "genre"
  );
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const genre = params.genre[0];
  const topics = await Fetcher(topicFacetsUrl('', null, genre, null));
  const records = await Fetcher(searchUrl('', 1, null, genre, null));
  const topicsFiltered = {
    ...topics,
    facets: {
      topic_facet: typeof topics.facets !== 'undefined'
        ? filterFacetFields(topics.facets.topic_facet)
        : []
    }
  };
  return { props: { records, genre, topics: topicsFiltered } };
}

export default function Genre({ records, genre, topics }) {
  const router = useRouter();
  if (!isServer && !router.isReady) {
    return '';
  }
  const page = Number(router.query.page || 1);
  if (page > 1) {
    records = null;
  }
  return <Search genreFacet={genre} initialPage={page} records={records} initialTopicFacets={topics}  queryKey="genre" queryValue={genre} />;
};
