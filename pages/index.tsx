import { useRouterScroll } from '@moxy/next-router-scroll';
import { NextSeo } from 'next-seo';
import { useEffect, useState } from 'react';
import { FaRedoAlt as ReloadIcon } from 'react-icons/fa';
import { useQuery } from 'react-query';

import { decades } from '@/components/DecadeFilter';
import { ResultGrid } from '@/components/ImageGrid';
import AppLink from '@/components/Link';
import { FacetStripe } from '@/components/Topics';
import { SearchHeading } from '@/components/Typo';
import { IFacetResult, IRecord } from '@/lib/api';
import { frontPageUrl, genreFacetsUrl, IFacet, ISearchResult, topicFacetsUrl } from '@/lib/api';
import Fetcher from '@/lib/fetcher';
import {
  appUrl,
  facetBrowseUrl,
  filterFacetFields,
  getPageTitle,
  useProgress,
  yearTitle,
} from '@/lib/util';

const DecadeFilter = ({ title, startYear }) => {
  const endYear = startYear < 2000 ? startYear + 9 : '*';
  return (
    <AppLink href={`/browse/date/${startYear}-${endYear}`}>
      <a>
        <div className="text-md subpixel-antialiased text-gray-800  uppercase tracking-tight bg-gradient-to-b from-gray-100 to-gray-300 py-1 px-2 rounded-lg cursor-pointer ripple-bg-white">
          {title}
        </div>
      </a>
    </AppLink>
  );
};

const DecadeFilters = ({ items }: { items: number[] }) => (
  <ul className="flex flex-wrap mt-2">
    {items.map((year) => (
      <li key={`decade-${year}`} className="mr-2 mb-2">
        <DecadeFilter startYear={year} title={yearTitle(year)} />
      </li>
    ))}
  </ul>
);

type PageProps = {
  topics: string[];
  genres: string[];
  decades: number[];
};

export async function getStaticProps(): Promise<Record<string, PageProps>> {
  const topics = (await Fetcher(topicFacetsUrl())) as IFacetResult;
  const topicsFiltered = filterFacetFields(
    (topics.facets as Record<string, IFacet[]>).topic_facet
  ).map((f) => f.value);
  const genres = (await Fetcher(genreFacetsUrl)) as IFacetResult;
  const genresFiltered = filterFacetFields(
    (genres.facets as Record<string, IFacet[]>).genre_facet
  ).map((f) => f.value);
  return {
    props: { topics: topicsFiltered, genres: genresFiltered, decades: decades },
  };
}

const getRandomClips = (records: IRecord[], cnt: number) => {
  if (records.length <= cnt) {
    return records;
  }
  const set = new Set();
  const max = records.length - 1;
  while (set.size < cnt) {
    set.add(Math.floor(Math.random() * max));
  }
  return records.filter((_, idx) => set.has(idx));
};

const FrontPage = ({ topics, genres, decades }: PageProps): React.ReactNode => {
  const { updateScroll } = useRouterScroll();
  const [selectedRandomClips, setSelectedRandomClips] = useState<IRecord[] | undefined>();
  const [randomClipsUrl, setRandomClipsUrl] = useState(frontPageUrl());
  const { data, isFetching } = useQuery<ISearchResult>(randomClipsUrl);
  useProgress(isFetching);

  useEffect(() => {
    updateScroll();
  }, [updateScroll]);

  useEffect(() => {
    if (data && data?.records) {
      setSelectedRandomClips(getRandomClips(data?.records, 8));
    }
  }, [data]);

  return (
    <>
      <NextSeo
        title={getPageTitle()}
        openGraph={{
          title: getPageTitle(),
          url: appUrl,
        }}
      />
      <div>
        <>
          <div>
            <div className="pt-2 w-full">
              <div className="flex flex-col flex-wrap md:flex-nowrap">
                <SearchHeading title="Yleisimmät aiheet" />
                <div className="h-16 min-h-32 w-full mt-1 mb-3">
                  <FacetStripe
                    facet="topic_facet"
                    facets={topics}
                    facetUrl={facetBrowseUrl}
                    truncate={true}
                  />
                </div>
              </div>
            </div>

            <div className="mt-6">
              <div className="flex flex-col text-center">
                <div className="flex items-center mb-1">
                  <SearchHeading title="Poimintoja" />
                  <div
                    className="cursor-pointer active:text-pink-500"
                    title="Näytä lisää"
                    onClick={() => {
                      setSelectedRandomClips(undefined);
                      setRandomClipsUrl(frontPageUrl());
                    }}>
                    <ReloadIcon />
                  </div>
                </div>
                <ResultGrid
                  records={typeof selectedRandomClips !== 'undefined' ? selectedRandomClips : []}
                  placeholder={isFetching || !selectedRandomClips}
                />
                <AppLink href="/browse/clips">
                  <a>
                    <div
                      role="button"
                      className="inline-flex mt-6 mb-4 py-3 px-4 text-md subpixel-antialiased font-medium tracking-tight rounded-xl bg-gray-200 text-gray-900 hover:text-black hover:bg-white cursor-pointer bg-gradient-to-b from-gray-100 to-gray-300 ripple-bg-white">
                      <div className="flex justify-center items-center">
                        <div className="inline-flex">Selaa elokuvia</div>
                      </div>
                    </div>
                  </a>
                </AppLink>
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
                  <FacetStripe facet="genre_facet" facets={genres} facetUrl={facetBrowseUrl} />
                </div>
              </div>
            </div>
          </div>
        </>
      </div>
    </>
  );
};

export default FrontPage;
