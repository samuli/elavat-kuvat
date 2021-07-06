import Search from '@/pages/search';
import Fetcher from '@/lib/fetcher';
import { searchUrl, genreFacetsUrl, topicFacetsUrl } from '@/lib/api';
import { filterFacetFields } from '@/lib/util';

export async function getStaticPaths() {
  const genres = await Fetcher(genreFacetsUrl);

  return {
    paths: genres?.facets.genre_facet.map((genre) => {
      return { params: { genre: genre.value } };
    }),
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const genre = params.genre;
  const records = await Fetcher(searchUrl('', 1, null, genre, null));
  const topics = await Fetcher(topicFacetsUrl('', null, genre, null));
  const topicsFiltered = {
    ...topics,
    facets: {
      topic_facet: typeof topics.facets !== 'undefined'
        ? filterFacetFields(topics.facets.topic_facet)
        : []
    }
  };
  return { props: { genre, records, topics: topicsFiltered } };
}

export default function Genre({ genre, topics, records }) {
  return <Search genreFacet={genre} initialTopicFacets={topics} records={records}  queryKey="genre" queryValue={genre} />;
};
