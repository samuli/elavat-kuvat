import Search from '@/pages/search';
import Fetcher from '@/lib/fetcher';
import { searchUrl, topicFacetsUrl } from '@/lib/api';
import { decades, dateRange } from '@/components/DecadeFilter';
import { filterFacetFields } from '@/lib/util';

export async function getStaticPaths() {
  return {
    paths: decades.map((startYear) => {
      return { params: { date: dateRange(startYear) } }
    }),
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const daterange = params.date;
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
  records.static = true;
  return <Search daterange={daterange} initialTopicFacets={topics} records={records}  queryKey="date" queryValue={daterange} />;
};
