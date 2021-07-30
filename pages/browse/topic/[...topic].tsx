import { GetStaticPathsResult, GetStaticPropsContext, GetStaticPropsResult } from 'next';
import { useRouter } from 'next/router';

import { IFacetResult, ISearchResult, searchUrl, topicFacetsUrl } from '@/lib/api';
import Fetcher from '@/lib/fetcher';
import { filterFacetFields, getSearchPageTitle, getStaticFacetPaths, isServer } from '@/lib/util';
import Search from '@/pages/search';

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
  if ((process.env.NO_STATIC_EXPORT || false) as boolean) {
    return { paths: [], fallback: false };
  }
  const paths = await getStaticFacetPaths(topicFacetsUrl(), 'topic');
  return { paths, fallback: false };
}

type PageProps = {
  topic: string | undefined;
  records: ISearchResult;
  topics: IFacetResult;
};

export async function getStaticProps({
  params,
}: GetStaticPropsContext): Promise<GetStaticPropsResult<PageProps>> {
  const topic = params?.topic ? params.topic[0] : undefined;
  const records = (await Fetcher(searchUrl('', 1, topic))) as ISearchResult;
  const topics = (await Fetcher(topicFacetsUrl('', topic))) as IFacetResult;
  const topicsFiltered = {
    ...topics,
    facets: {
      topic_facet:
        typeof topics.facets !== 'undefined' ? filterFacetFields(topics.facets.topic_facet) : [],
    },
  };

  return { props: { topic, records, topics: topicsFiltered } };
}

export default function Topic({ topic, records, topics }: PageProps): React.ReactElement {
  const router = useRouter();
  if (!isServer && !router.isReady) {
    return <></>;
  }
  const page = Number(router.query.page || 1);
  const pageTitle = getSearchPageTitle(undefined, topic);
  return (
    <Search
      pageTitle={page === 1 ? pageTitle : undefined}
      topicFacet={topic}
      initialPage={page}
      records={page === 1 ? records : undefined}
      initialTopicFacets={topics}
      queryKey="topic"
    />
  );
}

//export default Topic;
