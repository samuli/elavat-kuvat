import Search from '@/pages/search';
import Fetcher from '@/lib/fetcher';
import { searchUrl, topicFacetsUrl } from '@/lib/api';
import { filterFacetFields, getStaticFacetPaths } from '@/lib/util';

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
  const page = Number(params.topic[1] || 1);
  const records = await Fetcher(searchUrl('', page, topic, null, null));
  const topics = await Fetcher(topicFacetsUrl('', topic, null, null));
  const topicsFiltered = {
    ...topics,
    facets: {
      topic_facet: typeof topics.facets !== 'undefined'
        ? filterFacetFields(topics.facets.topic_facet)
        : []
    }
  };


  return { props: { page, topic, records, topics: topicsFiltered } };
}

export default function Topic({ topic, topics, records, page }) {
  records.static = true;
  return <Search topicFacet={topic} initialPage={page} initialTopicFacets={topics} records={records} queryKey="topic" queryValue={topic} />;
};
