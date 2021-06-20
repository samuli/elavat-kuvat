import { useEffect, useState } from 'react';
import HeadTags from '@/components/Head';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import useSWR from 'swr';
import clsx from 'clsx';
import NProgress from "nprogress";
import { FaPlay as PlayIcon, FaExternalLinkAlt as ExtLinkIcon } from 'react-icons/fa';
import { recordUrl } from '@/lib/api';
import AppLink from '@/components/Link';

import { extractVideoUrls, finnaRecordPage } from '@/lib/record';
import { Image } from '@/components/ImageGrid';
import { FacetStripe } from '@/components/Topics';
import { SearchHeading } from '@/components/Typo';
import Fetcher from '@/lib/fetcher';
import { facetSearchUrl } from '@/lib/util';

const Copyright = ({ record }) => {
  const d = record.rawData;
  const copyright = record.imageRights?.copyright;
  const url = record.imageRights?.link;


  let rightsLink = copyright;
  if (copyright && url) {
    rightsLink = <a href={url} target="_blank">{rightsLink}</a>
  }

  return (
    <div className="flex flex-col">
      <span className="uppercase text-xs font-bold">Aineiston käyttöoikeudet: </span>
      <a target="_blank" href={finnaRecordPage(record.recordPage)} className="hover:text-gray-800" title="Katso lisätiedot Finnassa">
        <div className="flex flex-row items-center">
          <div className="underline">{rightsLink}</div>
          <div className="text-gray-600 ml-1 flex jusitfy-center items-center text-xl">
            <span className="text-sm ml-2 "><ExtLinkIcon /></span>
          </div>
        </div>
            </a>
    </div>
  );
};

const Authors = ({ record }) => {
  return (
    <ul className="flex flex-wrap">
      { record.nonPresenterAuthors.map((author, idx) =>
        <li key={`${idx}-${author.name}`}>{author.name}</li>)}
    </ul>
  );
};

const Header = ({ record }) => {
  const d = record.rawData;
  return (
    <div>
      <h1 className="text-xl md:text-3xl font-bold">{record.title}</h1>
      <p className="text-md text-gray-100">
        {d.author_corporate && `${d.author_corporate} `}{d.main_date_str && d.main_date_str}
      </p>
    </div>
  );
};


const PlayButton = () => (
  <div className="shadow-lg bg-white text-gray-900 group-hover:bg-pink-500 group-hover:text-gray-100 fill-current stroke-current rounded-full items-center justify-center flex w-16 h-16 sm:w-24 sm:h-24 lg:w-32 lg:h-32 text-2xl sm:text-4xl"><div className="ml-2"><PlayIcon /></div></div>
);

const SmallPlayButton = () => (
  <div className="text-gray-100 group-hover:text-white fill-current stroke-current items-center justify-center flex text-sm">
    <div className="ml-1"><PlayIcon /></div>
  </div>
);

const Preview = ({ images = [], videoAvailable, recordUrl }) => {
  return (
    <div className="flex relative justify-center bg-gradient-to-b from-gray-900 to-gray-800 rounded-xl group cursor-pointer min-h-64">
      <div>
        <figure>
          <Image key={images[0]} src={images[0]} width="700" style={{ minHeight: '200px' }} />
        </figure>
      </div>
      <div className="absolute align-middle p-10 self-center align-center justify-center flex cursor-pointer">
        {videoAvailable && <PlayButton big={true} />}
        {!videoAvailable && (
          <div className="flex items-center justify-center text-2xl p-4 rounded-md bg-white text-gray-900 group-hover:bg-pink-500 group-hover:text-gray-100">
            Katso finna.fi:ssä<span className="ml-4"><ExtLinkIcon /></span>
          </div>)}
      </div>
    </div>
  );
};

const videoPage = (id, clip = 1) => `/play?id=${encodeURIComponent(id)}&clip=${clip}`;

const PreviewWrapper = ({ children, record, videoAvailable }) => {
  return videoAvailable
    ? <AppLink href={videoPage(record.id)}><a>{children}</a></AppLink>
    : <a href={finnaRecordPage(record.recordPage)} target="_blank">{children}</a>;
};

const Tags = ({ topics, genres }) => (
  <div>
    { topics.length > 0 && <div className="mb-2">
      <SearchHeading title="Aiheet" />
      <FacetStripe facet="topic_facet" facets={topics.map(f => {
        return { value: f, translated: f };
      })} facetUrl={facetSearchUrl} />
    </div>}
    { genres.length > 0 && <div>
      <SearchHeading title="Genret" />
      <FacetStripe facet="genre_facet" facets={genres.map(f => {
        return { value: f, translated: f };
      })} facetUrl={facetSearchUrl} />
    </div>}
  </div>
);

export default function View() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const id = router.query.id;

  const opt = {
    loadingTimeout: 1,
    onLoadingSlow: (_key, _config) => {
      NProgress.start();
      setLoading(true);
    },
    onError: (_err, _key, config) => {
      NProgress.done();
      setLoading(false);
    },
    onSuccess: (_data, _key, _config) => {
      NProgress.done();
      setLoading(false);
    }
  };

  const { data, error, ...rest } = useSWR(id ? recordUrl(id) : null, Fetcher, opt);

  const rec = data && !error && data.resultCount > 0 && data.records[0];

  if (error) return <p>error...</p>;

  const videoUrls = rec ? extractVideoUrls(rec) : [];
  const videoAvailable = videoUrls.length > 0;

  return (
    <div className="w-auto mx-7 font-sans">
      <HeadTags title={rec && rec.title} description={rec && rec.rawData?.description }/>
      <div className="mt-4">
        <article>
          {!loading && data && (
            <>
              <div className="flex flex-col md:flex-row">
                <div className="md:w-3/5 w-full">
                  <PreviewWrapper record={rec} videoAvailable={videoAvailable}>
                    <Preview images={rec?.images} videoAvailable={videoAvailable} recordUrl={finnaRecordPage(rec.recordPage)} />
                  </PreviewWrapper>
                </div>
                <div className="md:ml-8 flex flex-col justify-center mt-8 md:mt-0">
                  <Header record={rec} />
                  {videoUrls.length > 1 && <ul className="mt-5">{videoUrls.map(({ src, title }, idx) => (
                    <AppLink href={videoPage(rec.id, idx + 1)}><a>
                      <li className="flex my-2 items-center group text-gray-100 hover:text-white">
                        <SmallPlayButton big={false} /><div className="ml-3">{title}</div>
                      </li>
                    </a></AppLink>
                  ))}</ul>}
                </div>
              </div>
              <div className="max-w-2xl">
                {rec.rawData.description && <p className="mt-4 font-serif italic whitespace-pre-line leading-6 text-lg">{rec.rawData.description.replace(/<br( )?\/>/g, '\n')}</p>}

                <div className="my-5 flex flex-col sm:flex-row justify-between w-auto bg-yellow-50 text-gray-900 p-3 rounded-xl">
                  {rec.buildings && (
                    <div className="flex flex-col">
                      <div className="mr-2 uppercase text-xs font-bold">Aineiston tarjoaa: </div>
                      <div className="flex">
                        <a href="https://kavi.finna.fi" target="_blank" className="flex items-center justify-center underline hover:text-gray-700">
                          {rec.buildings[0].translated} <span className="ml-2 text-gray-700 text-xs"><ExtLinkIcon /></span>
                        </a>
                      </div>
                    </div>)}
                  <div className="sm:mt-0 mt-2"><Copyright record={rec} /></div>
                </div>
                <Tags topics={rec.rawData.topic_facet ?? []} genres={rec.rawData.genre_facet ?? []} />
              </div>
            </>
          )}
        </article>
      </div>
    </div>
  )
}
