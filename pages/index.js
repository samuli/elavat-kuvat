import Link from 'next/link';
import useSWR from 'swr';
import Fetcher from '@/lib/fetcher';
import { frontPageUrl, genreFacetsUrl, topicFacetsUrl } from '@/lib/api';
import { ResultGrid } from '@/components/ImageGrid';
import Facets from '@/components/Topics';
import HeadTags from '@/components/Head'
import Spinner from '@/components/Spinner';
import { yearTitle } from '@/lib/util';
import { decades } from '@/components/DecadeFilter';

const FacetSection = ({ facet, title, facets }) => {

      return (
        <div className="mb-6">
          <h2 className="text-2xl font-bold">{title}:</h2>
          <div className="mt-4"><Facets facet={facet} facets={facets} /></div>
        </div>
      );
};

const DecadeFilter = ({ title, startYear }) => {
  const endYear = startYear < 2000 ? startYear+9 : "*";
  return (
    <Link href={`/search?date=${startYear}-${endYear}`}><a>
      <div className="text-lg font-semibold uppercase bg-gray-100 text-gray-700 py-2 px-4 rounded-xl cursor-pointer hover:text-pink-500">
        {title}
      </div>
    </a></Link>
  );
};

const DecadeFilters = () => (
  <ul className="flex flex-wrap mt-2">
    { decades.map(year => (
      <li key={`decade-${year}`} className="mr-2 mb-2">
        <DecadeFilter startYear={year} title={yearTitle(year)} />
      </li>
    ))}
  </ul>
);

const FrontPage = () => {
  const { data } = useSWR(frontPageUrl('', 1, 3), Fetcher);
  const { data: topicFacets } = useSWR(topicFacetsUrl, Fetcher)
  const { data: genreFacets } = useSWR(genreFacetsUrl, Fetcher);
  //const { data: yearFacets } = useSWR(yearFacetsUrl, Fetcher);

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
          <div className="mb-5">
            <h2 className="text-2xl font-bold">Aikakausi:</h2>
            <DecadeFilters />
          </div>
          <div>
            { genreFacets?.status === 'OK' && <FacetSection title="Genret" facet="genre_facet" facets={genreFacets.facets.genre_facet} /> }
          </div>

          <div>
            { topicFacets?.status === 'OK' && <FacetSection title="Aiheet" facet="topic_facet" facets={topicFacets.facets.topic_facet} /> }
          </div>
          <div className="mt-8">
            <h2 className="text-2xl font-bold">Viimeksi lisätyt:</h2>
            { data?.status === 'OK' && (
              <div className="flex flex-col items-center ">
                <ResultGrid records={data.records} onOpenRecord={openRecord} width="200" height="200"/>
                <div className="flex justify-center mt-4 p-4 text-md uppercase rounded-xl bg-gray-200 text-gray-900 hover:text-black hover:bg-white cursor-pointer">
                  <Link href="/search"><a>Näytä kaikki klipit</a></Link>
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
