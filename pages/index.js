import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useRouterScroll } from '@moxy/next-router-scroll';

import AppLink from '@/components/Link';
import Fetcher from '@/lib/fetcher';
import { frontPageUrl, genreFacetsUrl, topicFacetsUrl } from '@/lib/api';
import { ResultGrid } from '@/components/ImageGrid';
import { SearchHeading } from '@/components/Typo';
import { FacetStripe } from '@/components/Topics';
import HeadTags from '@/components/Head'
import { facetBrowseUrl, filterFacetFields, yearTitle, useProgress } from '@/lib/util';
import { decades } from '@/components/DecadeFilter';
import { FaRedoAlt as ReloadIcon } from 'react-icons/fa';

const DecadeFilter = ({ title, startYear }) => {
  const endYear = startYear < 2000 ? startYear+9 : "*";
  return (
    <AppLink href={`/browse/date/${startYear}-${endYear}`}><a>
      <div role="button" className="text-md subpixel-antialiased text-gray-800  uppercase tracking-tight bg-gradient-to-b from-gray-100 to-gray-300 py-1 px-2 rounded-lg cursor-pointer ripple-bg-white">
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

export async function getStaticProps(context) {
  const topics = await Fetcher(topicFacetsUrl());
  const topicsFiltered = { facets: { topic_facet: filterFacetFields(topics.facets.topic_facet) }};
  const genres = await Fetcher(genreFacetsUrl);
  const genresFiltered = { facets: { genre_facet: filterFacetFields(genres.facets.genre_facet) }};
  return {
    props: { topics: topicsFiltered, genres: genresFiltered, decades: decades }
  }
}

const getRandomClips = (records, cnt) => {
  if (records.length <= cnt) {
    return records;
  }
  const set = new Set();
  const max = records.length-1;
  while (set.size < cnt) {
    set.add(Math.floor(Math.random() * max));
  }

  const order = Array.from(set);
  return records.filter((rec, idx) => set.has(idx));
};

const FrontPage = ({ randomClips, topics, genres, decades }) => {
  const { updateScroll } = useRouterScroll();
  const [ selectedRandomClips, setSelectedRandomClips] = useState();
  const [ randomClipsUrl, setRandomClipsUrl ] = useState(frontPageUrl());
  const { data, isFetching } = useQuery(randomClipsUrl, { initialData: randomClips });
  const { data: topicFacets } = useQuery(topicFacetsUrl(), { initialData: topics, refetchOnMount: false } )
  const { data: genreFacets } = useQuery(genreFacetsUrl, { initialData: genres, refetchOnMount: false });

  useProgress(isFetching);

  useEffect(() => {
    updateScroll();
  }, []);

  useEffect(() => {
    if (data && data.records) {
      setSelectedRandomClips(getRandomClips(data.records, 8));
    }
  }, [data]);

  return (
    <div>
      <HeadTags />
      <>
        <div>
            <div className="pt-2 w-full">
              <div className="flex flex-col flex-wrap md:flex-nowrap">
                <SearchHeading title="Yleisimmät aiheet" />
                <div className="h-16 min-h-32 w-full mt-1 mb-3">
                  { topicFacets && <FacetStripe title="Aiheet" facet="topic_facet" facets={topicFacets.facets.topic_facet} facetUrl={facetBrowseUrl} truncate={true}/> }
                </div>
              </div>
           </div>

          <div className="mt-6">

              <div className="flex flex-col text-center">
                <div className="flex items-center">
                  <SearchHeading title="Poimintoja" />
                  <div className="cursor-pointer active:text-pink-500" title="Näytä lisää" onClick={e => setRandomClipsUrl(frontPageUrl())}>
                    <ReloadIcon />
                  </div>
                </div>
                <ResultGrid lazy={false} records={selectedRandomClips || Array.from(Array(8))} />
                <AppLink href="/browse/clips/1"><a>
                  <div role="button" className="inline-flex mt-6 mb-4 py-3 px-4 text-md subpixel-antialiased font-medium tracking-tight rounded-xl bg-gray-200 text-gray-900 hover:text-black hover:bg-white cursor-pointer bg-gradient-to-b from-gray-100 to-gray-300 ripple-bg-white">
                    <div className="flex justify-center items-center">
                      <div className="inline-flex">Näytä kaikki klipit</div>
                    </div>
                  </div>
                </a></AppLink>
              </div>

          </div>

          <div className="w-full">
            <div className="flex flex-col flex-wrap md:flex-nowrap">

              <div>
                <SearchHeading title="Aikakausi" />
                <DecadeFilters items={decades} />
              </div>

              <div className="mt-2">
                <SearchHeading title="Genret" />
                { genreFacets && <FacetStripe title="Genret" facet="genre_facet" facets={filterFacetFields(genreFacets.facets.genre_facet)} facetUrl={facetBrowseUrl} /> }
              </div>
            </div>
          </div>
        </div>
      </>
    </div>
  );
};


export default FrontPage;
