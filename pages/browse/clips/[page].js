import { useRouter } from 'next/router';

import Search from '@/pages/search';
import Fetcher from '@/lib/fetcher';
import { searchUrl, searchLimit, topicFacetsUrl } from '@/lib/api';
import { filterFacetFields, isServer } from '@/lib/util';

export async function getStaticPaths() {
  if (Boolean(process.env.NO_STATIC_EXPORT)) {
    return { paths: [], fallback: false };
  }

  const records = await Fetcher(searchUrl('', 1));
  const recordPages = Math.ceil(records.resultCount/searchLimit);
  const base = '/browse/clips';
  const paths = Array.from(Array(recordPages)).map((_, page) => {
    return `${base}/${page+1}`;
  });
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const page = Number(params.page || 1);
  const records = await Fetcher(searchUrl('', 1));
  const topics = await Fetcher(topicFacetsUrl(''));
  const topicsFiltered = {
    ...topics,
    facets: {
      topic_facet: typeof topics.facets !== 'undefined'
        ? filterFacetFields(topics.facets.topic_facet)
        : []
    }
  };
  return { props: { page, records, topics: topicsFiltered } };
}

export default function Clips({ page, records, topics }) {
  // const router = useRouter();
  // if (!router.isReady) {
  //   return '';
  // }
  // const page = router.query.page || 1;
  const router = useRouter();
  if (!isServer && !router.isReady) {
    return '';
  }
  if (Number(page) > 1) {
    records = null;
  }
  return <Search initialPage={page} initialTopicFacets={topics} records={records} queryKey="clips" />;
};
