import { GetStaticPathsResult, GetStaticPropsResult } from 'next';
import { useRouter } from 'next/router';

import { IFacet, IFacetResult, ISearchResult, searchUrl, topicFacetsUrl } from '@/lib/api';
import Fetcher from '@/lib/fetcher';
import { filterFacetFields, getSearchPageTitle, isServer } from '@/lib/util';
import Search from '@/pages/search';

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
  if ((process.env.NO_STATIC_EXPORT || false) as boolean) {
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

type PageProps = {
  records: ISearchResult;
  topics: IFacetResult;
};

export async function getStaticProps(): Promise<GetStaticPropsResult<PageProps>> {
  const records = (await Fetcher(searchUrl('', 1))) as ISearchResult;
  const topics = (await Fetcher(topicFacetsUrl())) as IFacetResult;
  const topicsFiltered = {
    ...topics,
    facets: {
      topic_facet:
        typeof topics.facets !== 'undefined'
          ? filterFacetFields((topics.facets as Record<string, IFacet[]>).topic_facet)
          : [],
    },
  };
  return { props: { records, topics: topicsFiltered } };
}

const Clips = ({ records, topics }: PageProps): React.ReactElement => {
  const router = useRouter();
  if (!isServer && !router.isReady) {
    return <></>;
  }
  const page = Number(router.query.page || 1);
  const pageTitle: string | undefined = getSearchPageTitle();
  return (
    <Search
      pageTitle={page == 1 ? pageTitle : undefined}
      initialPage={page}
      initialTopicFacets={topics}
      records={page == 1 ? records : undefined}
      queryKey="clips"
    />
  );
};

export default Clips;
