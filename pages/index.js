import { useState } from 'react';
import Link from 'next/link';
import useSWR from 'swr';
import Fetcher from '@/lib/fetcher';
import { frontPageUrl, genreFacetsUrl, topicFacetsUrl } from '@/lib/api';
import { ResultGrid } from '@/components/ImageGrid';
import { FacetList, FacetStripe } from '@/components/Topics';
import HeadTags from '@/components/Head'
import Spinner from '@/components/Spinner';
import { facetSearchUrl, yearTitle } from '@/lib/util';
import { decades } from '@/components/DecadeFilter';

const FacetSection = ({ facet, title, facets }) => {

      return (
        <div className="mb-6">
          <h2 className="text-2xl font-bold">{title}:</h2>
          <div className="mt-4"><FacetStripe facet={facet} facets={facets} facetUrl={(facet,value) => ""} /></div>
        </div>
      );
};

const DecadeFilter = ({ title, startYear }) => {
  const endYear = startYear < 2000 ? startYear+9 : "*";
  return (
    <Link href={`/search?date=${startYear}-${endYear}`}><a>
      <div className="text-md font-semibold uppercase tracking-tighter bg-gray-100 text-gray-700 py-1 px-2 rounded-lg cursor-pointer hover:text-pink-500">
        {title}
      </div>
    </a></Link>
  );
};

const DecadeFilters = () => (
  <ul className="flex flex-wrap mt-2">
    { decades.reverse().map(year => (
      <li key={`decade-${year}`} className="mr-2 mb-2">
        <DecadeFilter startYear={year} title={yearTitle(year)} />
      </li>
    ))}
  </ul>
);

const FrontPage = () => {
  const [ randomClipsUrl ] = useState(frontPageUrl());
  const { data } = useSWR(typeof randomClipsUrl !== 'undefined' ? randomClipsUrl : null, Fetcher);
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
          <div className="mt-8">

            { data?.status === 'OK' && (
              <div className="flex flex-col items-center ">
                <ResultGrid records={data.records.slice(0,8)} onOpenRecord={openRecord} width="200" height="200"/>
                <div className="flex justify-center mt-4 p-4 text-md uppercase rounded-xl bg-gray-200 text-gray-900 hover:text-black hover:bg-white cursor-pointer">
                  <Link href="/search"><a>Näytä kaikki klipit</a></Link>
                </div>
              </div>
            ) }
          </div>


          <div>
            <h2 className="text-2xl font-bold">Aiheet:</h2>
            { topicFacets?.status === 'OK' && <FacetStripe title="Aiheet" facet="topic_facet" facets={topicFacets.facets.topic_facet} facetUrl={facetSearchUrl} /> }
          </div>

          <div className="mb-5">
            <h2 className="text-2xl font-bold">Aikakausi:</h2>
            <DecadeFilters />
          </div>

          <div>
            <h2 className="text-2xl font-bold">Genret:</h2>
            { genreFacets?.status === 'OK' && <FacetStripe title="Genret" facet="genre_facet" facets={genreFacets.facets.genre_facet} facetUrl={facetSearchUrl} /> }
          </div>

        </div> ) }
      </div>
    </div>
  );
};


export default FrontPage;
