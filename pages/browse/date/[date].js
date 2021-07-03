import { useRouter } from 'next/router';
import Search from '@/pages/search';
import Fetcher from '@/lib/fetcher';
import { searchUrl, topicFacetsUrl } from '@/lib/api';
import { decades, dateRange } from '@/components/DecadeFilter';

export async function getStaticPaths() {
  return {
    paths: decades.map((startYear) => {
      return { params: { date: dateRange(startYear) } }
    }),
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const rangeYears = params.date.split('-');
  const records = await Fetcher(searchUrl('', 1, null, null, rangeYears));
  const topics = await Fetcher(topicFacetsUrl('', null, null, rangeYears));
  return { props: { records, topics } };
}

export default function Date({ records, topics }) {
  const router = useRouter();
  const daterange = router.query?.date;
  return <Search daterange={daterange} initialTopicFacets={topics} records={records} />;
};
