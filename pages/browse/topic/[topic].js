import Search from '@/pages/search';
import Fetcher from '@/lib/fetcher';
import { searchUrl, topicFacetsUrl } from '@/lib/api';
import { filterFacetFields } from '@/lib/util';

export async function getStaticPaths() {
  const topics = await Fetcher(topicFacetsUrl());

  return {
    paths: topics?.facets.topic_facet.map((topic) => {
      return { params: { topic: topic.value} };
    }),
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const topic = params.topic;
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

export default function Topic({ topic, topics, records }) {
  return <Search topicFacet={topic} initialTopicFacets={topics} records={records} queryKey="topic" queryValue={topic} />;
};
