import Link from 'next/link';
import useSWR from 'swr';
import Fetcher from '@/lib/fetcher';
import { frontPageUrl, genreFacetsUrl, topicFacetsUrl } from '@/lib/api';
import { ResultGrid } from '@/components/ImageGrid';
import Facets from '@/components/Topics';
import HeadTags from '@/components/Head'
import Spinner from '@/components/Spinner';

const FacetSection = ({ facet, title, facets }) => {

      return (
        <div className="mb-4">
          <h2 className="text-2xl">{title}:</h2>
          <div className="mt-4"><Facets facet={facet} facets={facets} /></div>
        </div>
      );
};

const FrontPage = () => {
  const { data } = useSWR(frontPageUrl('', 1, 3), Fetcher);
  const { data: topicFacets } = useSWR(topicFacetsUrl, Fetcher)
  const { data: genreFacets } = useSWR(genreFacetsUrl, Fetcher);

  const openRecord = (id) => {
    router.push(`/view?id=${encodeURIComponent(id)}`);
  };

  return (
    <div>
      <HeadTags />
      <div className="p-5">
        { !data && <Spinner /> }
        { data && (
        <div>
          <div>
            { genreFacets?.status === 'OK' && <FacetSection title="Genret" facet="genre_facet" facets={genreFacets.facets.genre_facet} /> }
          </div>

          <div>
            { topicFacets?.status === 'OK' && <FacetSection title="Aiheet" facet="topic_facet" facets={topicFacets.facets.topic_facet} /> }
          </div>
          <div className="mt-8">
            <h2 className="text-2xl">Viimeksi lisätyt:</h2>
            { data?.status === 'OK' && (
              <div className="flex flex-col items-center ">
                <ResultGrid records={data.records} onOpenRecord={openRecord} width="200" height="200"/>
                <div className="flex justify-center p-4 text-2xl rounded-xl bg-gray-200 text-gray-900 hover:text-black hover:bg-white cursor-pointer">
                  <Link href="/search"><a>Näytä kaikki ({data.resultCount})</a></Link>
                </div>
              </div>
            ) }
          </div>
        </div> ) }
      </div>
    </div>
  );
};


export default FrontPage;
