import { GetStaticPathsResult, GetStaticPropsContext, GetStaticPropsResult } from 'next';
import { useRouter } from 'next/router';

import { dateRange, decades } from '@/components/DecadeFilter';
import {
  IFacet,
  IFacetResult,
  ISearchResult,
  searchUrl,
  TDaterange,
  topicFacetsUrl,
  yearFacetsUrl,
} from '@/lib/api';
import Fetcher from '@/lib/fetcher';
import { filterFacetFields, getSearchPageTitle, getStaticFacetPaths, isServer } from '@/lib/util';
import Search from '@/pages/search';

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
  if ((process.env.NO_STATIC_EXPORT || false) as boolean) {
    return { paths: [], fallback: false };
  }

  const facets = decades.map((startYear) => {
    return { value: dateRange(startYear), translated: '' };
  });

  const paths = await getStaticFacetPaths(yearFacetsUrl, 'date', facets);
  return { paths, fallback: false };
}

type PageProps = {
  daterange: string | undefined;
  records: ISearchResult;
  topics: IFacetResult;
};

export async function getStaticProps({
  params,
}: GetStaticPropsContext): Promise<GetStaticPropsResult<PageProps>> {
  const daterange = params?.date ? params.date[0] : undefined;
  const rangeYears = daterange ? (daterange.split('-') as TDaterange) : undefined;
  const records = (await Fetcher(
    searchUrl('', 1, undefined, undefined, rangeYears)
  )) as ISearchResult;
  const topics = (await Fetcher(
    topicFacetsUrl('', undefined, undefined, rangeYears)
  )) as IFacetResult;
  const topicsFiltered = {
    ...topics,
    facets: {
      topic_facet:
        typeof topics.facets !== 'undefined'
          ? filterFacetFields((topics.facets as Record<string, IFacet[]>).topic_facet)
          : [],
    },
  };
  return { props: { daterange, records, topics: topicsFiltered } };
}

const Date = ({ daterange, records, topics }: PageProps): React.ReactElement => {
  const router = useRouter();
  if (!isServer && !router.isReady) {
    return <></>;
  }
  const page = Number(router.query.page || 1);
  const pageTitle = getSearchPageTitle(undefined, undefined, undefined, daterange);

  const s = (
    <Search
      pageTitle={page === 1 ? pageTitle : undefined}
      daterange={daterange}
      initialPage={page}
      records={page === 1 ? records : undefined}
      initialTopicFacets={topics}
      queryKey="date"
    />
  );

  return s;
};

export default Date;
