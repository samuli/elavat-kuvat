import { useState } from 'react';
import Link from 'next/link';
import useSWR from 'swr';
import Fetcher from '@/lib/fetcher';
import { frontPageUrl, genreFacetsUrl, topicFacetsUrl } from '@/lib/api';
import { ResultGrid } from '@/components/ImageGrid';
import { SearchHeading } from '@/components/Typo';
//import { PlayIcon } from '@/components/PlayIcon';
import { FaPlay as PlayIcon } from 'react-icons/fa';
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
      <>
        { !data && <div className="p-5"><Spinner /></div> }
        { data && (
        <div>
            <div className="pt-2 px-5 w-full">
              <div className="flex flex-col flex-wrap md:flex-nowrap">
                <SearchHeading title="Aiheita" />
            { topicFacets?.status === 'OK' && <FacetStripe title="Aiheet" facet="topic_facet" facets={topicFacets.facets.topic_facet} facetUrl={facetSearchUrl} lines={3}/> }
             </div>
          </div>

          <div className="mt-4">
            { data?.status === 'OK' && (
              <div className="flex flex-col items-center ">
                <ResultGrid records={data.records.slice(0,8)} onOpenRecord={openRecord} width="200" height="200"/>
                <div className="flex justify-center mt-4 py-3 px-4 text-md uppercase rounded-xl bg-gray-200 text-gray-900 hover:text-black hover:bg-white cursor-pointer">
                  <Link href="/search"><a>
                    <div className="flex justify-center items-center">
                      <div>Näytä kaikki</div>
              {/*                      <div className="text-xs text-white p-2 ml-2 rounded-full bg-green-500"><PlayIcon/></div> */}
                    </div>
                  </a></Link>
                </div>
              </div>
            ) }
          </div>

          <div className="px-5 w-full">
            <div className="flex flex-col flex-wrap md:flex-nowrap">

              <div>
                <SearchHeading title="Aikakausi" />
                <DecadeFilters />
              </div>

              <div className="mt-2">
                <SearchHeading title="Genret" />
                { genreFacets?.status === 'OK' && <FacetStripe title="Genret" facet="genre_facet" facets={genreFacets.facets.genre_facet} facetUrl={facetSearchUrl} /> }
              </div>
            </div>
          </div>
        </div> ) }
      </>
    </div>
  );
};


export default FrontPage;
