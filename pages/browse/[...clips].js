import { useRouter } from 'next/router';

import Search from '@/pages/search';
import Fetcher from '@/lib/fetcher';
import { searchUrl, searchLimit, topicFacetsUrl } from '@/lib/api';
import { filterFacetFields, isServer } from '@/lib/util';

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
  return { paths: ['/browse/clips'], fallback: false };
}

export async function getStaticProps({ params }) {
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
  return { props: { records, topics: topicsFiltered } };
}

export default function Clips({ records, topics }) {
  const router = useRouter();
  if (!router.isReady) {
    return '';
  }
  const page = router.query.page || 1;
  if (Number(page) > 1) {
    records = null;
  }
  console.log("page", page);
  return <Search initialPage={page} initialTopicFacets={topics} records={records} queryKey="clips" />;
};
