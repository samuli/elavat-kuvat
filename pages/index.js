import { useState } from 'react';
import useSWR from 'swr';
import NProgress from "nprogress";

import AppLink from '@/components/Link';
import Fetcher from '@/lib/fetcher';
import { frontPageUrl, genreFacetsUrl, topicFacetsUrl } from '@/lib/api';
import { ResultGrid } from '@/components/ImageGrid';
import { SearchHeading } from '@/components/Typo';
import { FacetStripe } from '@/components/Topics';
import HeadTags from '@/components/Head'
import { facetSearchUrl, yearTitle } from '@/lib/util';
import { decades } from '@/components/DecadeFilter';

const DecadeFilter = ({ title, startYear }) => {
  const endYear = startYear < 2000 ? startYear+9 : "*";
  return (
    <AppLink href={`/search?date=${startYear}-${endYear}`}><a>
      <div role="button" className="text-md text-gray-800  uppercase tracking-tight bg-gradient-to-b from-gray-100 to-gray-300 py-1 px-2 rounded-lg cursor-pointer hover:from-white hover:to-white">
        {title}
      </div>
    </a></AppLink>
  );
};

const DecadeFilters = ({ items }) => (
  <ul className="flex flex-wrap mt-2">
    { items.map(year => (
      <li key={`decade-${year}`} className="mr-2 mb-2">
        <DecadeFilter startYear={year} title={yearTitle(year)} />
      </li>
    ))}
  </ul>
);

const FrontPage = () => {
  const opt = {
    loadingTimeout: 10,
    onLoadingSlow: () => {
      NProgress.start();
    },
    onError: () => {
      NProgress.done();
    },
    onSuccess: () => {
      NProgress.done();
    }
  };

  const [ randomClipsUrl ] = useState(frontPageUrl());
  const { data } = useSWR(typeof randomClipsUrl !== 'undefined' ? randomClipsUrl : null, Fetcher, opt);
  const { data: topicFacets } = useSWR(topicFacetsUrl, Fetcher)
  const { data: genreFacets } = useSWR(genreFacetsUrl, Fetcher);

  const decadesReveresed = decades.reverse();
  const openRecord = (id) => {
    router.push(`/view?id=${encodeURIComponent(id)}`);
  };

  return (
    <div>
      <HeadTags />
      <>
        { data && (
        <div>
            <div className="pt-2 px-5 w-full">
              <div className="flex flex-col flex-wrap md:flex-nowrap">
                <SearchHeading title="Yleisimmät aiheet" />
                <div className="h-16 min-h-32 w-full mt-1 mb-3">
                  { topicFacets?.status === 'OK' && <FacetStripe title="Aiheet" facet="topic_facet" facets={topicFacets.facets.topic_facet} facetUrl={facetSearchUrl} truncate={true}/> }
                </div>
              </div>
           </div>

          <div className="mt-4">
            { data?.status === 'OK' && (
              <div className="flex flex-col items-center ">
                <ResultGrid records={data.records.slice(0,8)} onOpenRecord={openRecord} width="200" height="200"/>
                <AppLink href="/search"><a>
                  <div role="button" className="flex justify-center mt-6 mb-4 py-3 px-4 text-sm font-semibold tracking-tight uppercase rounded-xl bg-gray-200 text-gray-900 hover:text-black hover:bg-white cursor-pointer bg-gradient-to-b from-gray-100 to-gray-300 hover:from-white hover:to-white">
                    <div className="flex justify-center items-center">
                      <div>Kaikki klipit</div>
                    </div>
                  </div>
                </a></AppLink>
              </div>
            ) }
          </div>

          <div className="px-5 w-full">
            <div className="flex flex-col flex-wrap md:flex-nowrap">

              <div>
                <SearchHeading title="Aikakausi" />
                <DecadeFilters items={decadesReveresed} />
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
