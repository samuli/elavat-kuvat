import Search from '@/pages/search';
import Fetcher from '@/lib/fetcher';
import { searchUrl, genreFacetsUrl, topicFacetsUrl } from '@/lib/api';
import { filterFacetFields, getStaticFacetPaths } from '@/lib/util';

export async function getStaticPaths() {
  if (Boolean(process.env.NO_STATIC_EXPORT)) {
    return { paths: [], fallback: false };
  }

  const paths = await getStaticFacetPaths(
    genreFacetsUrl,
    genre => searchUrl('', 1, null, genre),
    "genre"
  );
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const genre = params.genre[0];
  const page = Number(params.genre[1] || 1);
  const records = await Fetcher(searchUrl('', page, null, genre, null));
  const topics = await Fetcher(topicFacetsUrl('', null, genre, null));
  const topicsFiltered = {
    ...topics,
    facets: {
      topic_facet: typeof topics.facets !== 'undefined'
        ? filterFacetFields(topics.facets.topic_facet)
        : []
    }
  };
  return { props: { page, genre, records, topics: topicsFiltered } };
}

export default function Genre({ genre, topics, records, page }) {
  records.static = true;
  return <Search genreFacet={genre} initialPage={page} initialTopicFacets={topics} records={records}  queryKey="genre" queryValue={genre} />;
};
