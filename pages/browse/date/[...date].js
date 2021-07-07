import Search from '@/pages/search';
import Fetcher from '@/lib/fetcher';
import { searchUrl, topicFacetsUrl } from '@/lib/api';
import { decades, dateRange } from '@/components/DecadeFilter';
import { filterFacetFields, getStaticFacetPaths } from '@/lib/util';

export async function getStaticPaths() {
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
  const page = Number(params.date[1] || 1);

  const records = await Fetcher(searchUrl('', page, null, null, rangeYears));
  const topics = await Fetcher(topicFacetsUrl('', null, null, rangeYears));
  const topicsFiltered = {
    ...topics,
    facets: {
      topic_facet: typeof topics.facets !== 'undefined'
        ? filterFacetFields(topics.facets.topic_facet)
        : []
    }
  };
  return { props: { page, daterange, records, topics: topicsFiltered } };
}

export default function Date({ page, daterange, records, topics }) {
  records.static = true;
  return <Search daterange={daterange} initialPage={page} initialTopicFacets={topics} records={records}  queryKey="date" queryValue={daterange} />;
};
