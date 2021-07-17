import { useRouter } from 'next/router';

import Search from '@/pages/search';
import Fetcher from '@/lib/fetcher';
import { searchUrl, topicFacetsUrl } from '@/lib/api';
import { decades, dateRange } from '@/components/DecadeFilter';
import { filterFacetFields, getStaticFacetPaths, isServer, getSearchPageTitle } from '@/lib/util';

export async function getStaticPaths() {
  if (Boolean(process.env.NO_STATIC_EXPORT)) {
    return { paths: [], fallback: false };
  }

  const facets = decades.map(startYear => {
    return { value: dateRange(startYear) };
  });

  const paths = await getStaticFacetPaths(
    null,
    daterange => searchUrl('', 1, null, null, daterange.split('-')),
    "date",
    facets
  );

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const daterange = params.date[0];
  const rangeYears = daterange.split('-');
  const records = await Fetcher(searchUrl('', 1, null, null, rangeYears));
  const topics = await Fetcher(topicFacetsUrl('', null, null, rangeYears));
  const topicsFiltered = {
    ...topics,
    facets: {
      topic_facet: typeof topics.facets !== 'undefined'
        ? filterFacetFields(topics.facets.topic_facet)
        : []
    }
  };
  return { props: { daterange, records, topics: topicsFiltered } };
}

export default function Date({ daterange, records, topics }) {
  const router = useRouter();
  if (!isServer && !router.isReady) {
    return '';
  }
  const page = Number(router.query.page || 1);
  let pageTitle = getSearchPageTitle(null, null, null, daterange);
  if (page > 1) {
    records = null;
    pageTitle = null;
  }
  return <Search pageTitle={pageTitle} daterange={daterange} initialPage={page} records={records} initialTopicFacets={topics} queryKey="date" />;
};
