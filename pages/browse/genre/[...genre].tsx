import { GetStaticPathsResult, GetStaticPropsContext,GetStaticPropsResult } from 'next';
import { useRouter } from 'next/router';

import {
  genreFacetsUrl,
  IFacet,
  IFacetResult,
  ISearchResult,
  searchUrl,
  topicFacetsUrl,
} from '@/lib/api';
import Fetcher from '@/lib/fetcher';
import { filterFacetFields, getSearchPageTitle, getStaticFacetPaths, isServer } from '@/lib/util';
import Search from '@/pages/search';

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
  if ((process.env.NO_STATIC_EXPORT || false) as boolean) {
    return { paths: [], fallback: false };
  }

  const paths = await getStaticFacetPaths(genreFacetsUrl, 'genre');
  return { paths, fallback: false };
}

type PageProps = {
  genre: string | undefined;
  records: ISearchResult;
  topics: IFacetResult;
};

export async function getStaticProps({
  params,
}: GetStaticPropsContext): Promise<GetStaticPropsResult<PageProps>> {
  const genre = params?.genre ? params.genre[0] : undefined;

  const topics = (await Fetcher(topicFacetsUrl('', undefined, genre))) as IFacetResult;
  const records = (await Fetcher(searchUrl('', 1, undefined, genre))) as ISearchResult;

  const topicsFiltered = {
    ...topics,
    facets: {
      topic_facet:
        typeof topics.facets !== 'undefined'
          ? filterFacetFields((topics.facets as Record<string, IFacet[]>).topic_facet)
          : [],
    },
  };
  return { props: { records, genre, topics: topicsFiltered } };
}

const Genre = ({ records, genre, topics }: PageProps): React.ReactElement => {
  const router = useRouter();
  if (!isServer && !router.isReady) {
    return <></>;
  }
  const page = Number(router.query?.page || 1);
  const pageTitle = getSearchPageTitle(undefined, undefined, genre);
  return (
    <Search
      pageTitle={page === 1 ? pageTitle : undefined}
      genreFacet={genre}
      initialPage={page}
      records={page === 1 ? records : undefined}
      initialTopicFacets={topics}
      queryKey="genre"
    />
  );
};

export default Genre;
