import { useRouter } from 'next/router';

import Search from '@/pages/search';
import Fetcher from '@/lib/fetcher';
import { searchUrl, topicFacetsUrl } from '@/lib/api';
import { filterFacetFields, getStaticFacetPaths, isServer, getPageTitle } from '@/lib/util';

export async function getStaticPaths() {
  if (Boolean(process.env.NO_STATIC_EXPORT)) {
    return { paths: [], fallback: false };
  }

  const paths = await getStaticFacetPaths(
    topicFacetsUrl(),
    topic => searchUrl('', 1, topic),
    "topic"
  );
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const topic = params.topic[0];
  const records = await Fetcher(searchUrl('', 1, topic, null, null));
  const topics = await Fetcher(topicFacetsUrl('', topic, null, null));
  const topicsFiltered = {
    ...topics,
    facets: {
      topic_facet: typeof topics.facets !== 'undefined'
        ? filterFacetFields(topics.facets.topic_facet)
        : []
    }
  };

  return { props: { topic, records, topics: topicsFiltered } };
}

export default function Topic({ topic, records, topics }) {
  const router = useRouter();
  if (!isServer && !router.isReady) {
    return '';
  }
  const page = Number(router.query.page || 1);
  if (page > 1) {
    records = null;
  }
  return <Search pageTitle={getPageTitle(null, topic)} topicFacet={topic} initialPage={page} records={records} initialTopicFacets={topics} queryKey="topic"/>;
};
