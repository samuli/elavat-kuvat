import { useEffect, useState, useRef } from 'react';
import HeadTags from '@/components/Head';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { useQuery } from 'react-query';
import { useDebouncedCallback } from 'use-debounce';
import clsx from 'clsx';
import ReactPlayer from 'react-player/file'

import { FaPlay as PlayIcon, FaExternalLinkAlt as ExtLinkIcon } from 'react-icons/fa';
import { useAppDispatch, CMD_PAGE_LOADED } from '@/lib/state';
import { recordUrl } from '@/lib/api';
import AppLink from '@/components/Link';
import AppError from '@/components/AppError';
import { extractVideoUrls, finnaRecordPage } from '@/lib/record';
import { Image } from '@/components/ImageGrid';
import { FacetStripe } from '@/components/Topics';
import { SearchHeading } from '@/components/Typo';
import Fetcher from '@/lib/fetcher';
import { facetSearchUrl, useProgress } from '@/lib/util';

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
        <div className="text-sm flex flex-row items-center">
          <div className="underline">{rightsLink}</div>
          <div className="text-gray-600 ml-1 flex jusitfy-center items-center text-xl">
            <span className="text-xs ml-2 "><ExtLinkIcon /></span>
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

const PlayButtonWrapper = ({ children }) => (
  <div className="flex items-center justify-center font-semibold text-lg px-4 py-3 rounded-xl bg-gradient-to-b from-pink-500 to-red-500 text-gray-100 border-2 border-red-500">{children}</div>
);

const PlayButton = (external = false) => (
  <PlayButtonWrapper>
    <div className="ml-2 flex items-center uppercase text-sm">Katso <span className="ml-2 text-xs"><PlayIcon /></span></div>
  </PlayButtonWrapper>
);

const SmallPlayButton = () => (
  <div className="text-gray-100 group-hover:text-white fill-current stroke-current items-center justify-center flex text-sm">
    <div className="ml-1"><PlayIcon /></div>
  </div>
);

const Preview = ({ imageUrl }) => {
  return (
    <div className="flex relative items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800 rounded-xl group cursor-pointer min-h-64">
      <div className="w-full h-full">
        <div className="aspect-w-5 aspect-h-4">
          { imageUrl && <img alt="" src={imageUrl} className="w-auto rouded-xl overflow-hidden object-cover object-center" /> }
        </div>
      </div>
      <div className="absolute align-middle p-10 self-center align-center justify-center flex cursor-pointer">
        <PlayButtonWrapper>
          Katso Finnassa<span className="text-lg ml-4"><ExtLinkIcon /></span>
        </PlayButtonWrapper>
      </div>
    </div>
  );
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

const Description = ({ text }) => {
  const parts = text.replace(/<br( )?\/>/g, '\n').split('\n');
  const collapse = parts.length > 1;
  return (
    <div className="mt-4 leading-snug text-md">
      { collapse && (
        <details>
          <summary className="cursor-pointer whitespace-pre-line outline-none">{parts[0]}</summary>
          { parts.length > 1 && <div>{parts.slice(1).map((el,idx) => <p className="pt-2" key={`detail-${idx}`}>{el}</p>)}</div> }
        </details> ) }
      { !collapse && <p>{parts[0]}</p> }
    </div>
  );
};

export default function View({ id = null, recordData = null }) {
  const appDispatch = useAppDispatch();
  const router = useRouter();
  const [videoUrl, setVideoUrl] = useState(null);
  const [pauseVideo, setPauseVideo] = useState(true);
  const videoRef = useRef(null);

  id = id || router.query.id;

  useEffect(() => {
    appDispatch({ type: CMD_PAGE_LOADED });
  }, []);

  const { data, status, error, isFetching } = useQuery(
    recordUrl(id),
    { enabled: !!id, initialData: recordData, refetchOnMount: recordData === null }
  );

  useProgress(isFetching);

  const rec = data && !error && data.resultCount > 0 && data.records[0];

  if (error || (!isFetching && data && data.status === 'ERROR')) return <AppError />;

  const videoUrls = rec ? extractVideoUrls(rec) : [];
  useEffect(() => setVideoUrl(videoUrls[0]), [rec])

  const videoAvailable = videoUrls.length > 0;
  const imageUrl = rec && rec.images ? `https://api.finna.fi${rec.images[0]}` : null;
  return (
    <div className="w-auto font-sans">
      <HeadTags title={rec && rec.title} description={rec && rec.rawData?.description }/>
      <div className="mt-3">
        <article>
          {!isFetching && rec && (
            <>
              <div className="flex flex-col w-full max-w-2xl">
                <div className="aspect-w-4 aspect-h-3 overflow-hidden">
                  {videoUrl && <ReactPlayer
                    ref={videoRef}
                    className="react-player -mt-2"
                    url={videoUrl.src}
                    width='100%'
                    height='100%'
                    playing={true}
                    controls
                    muted
                    pip={false}
                    playIcon={<PlayButton />}
                    light={pauseVideo ? `https://api.finna.fi${rec.images[0]}` : false}
                  /> }
                  { !videoAvailable &&
                   <a href={finnaRecordPage(rec.recordPage)} target="_blank">
                     <Preview imageUrl={imageUrl ? imageUrl : null} />
                   </a>
                  }
                </div>
                <div className="flex flex-col justify-center mt-2">
                  <Header record={rec} />
                  {videoUrls.length > 1 && <ul className="mt-5">{videoUrls.map((url, idx) => (
                    <li key={url.src} onClick={e => {
                      setVideoUrl(url);
                      setPauseVideo(false);
                      videoRef.current.seekTo(0);
                    }} className="flex my-2 items-center group text-md text-gray-200 hover:text-white cursor-pointer">
                      <SmallPlayButton big={false} /><div className="ml-3">{url.title}</div>
                    </li>
                  ))}</ul>}
                </div>
              </div>
              <div className="max-w-2xl">
                {rec.rawData.description && <Description text={rec.rawData.description} /> }
                <div className="my-5 inline-flex flex-col sm:flex-row bg-yellow-50 text-gray-900 p-3 rounded-md">
                  {rec.buildings && (
                    <div className="flex flex-col">
                      <div className="mr-2 uppercase text-xs font-bold">Aineiston tarjoaa: </div>
                      <div className="flex text-sm">
                        <a href="https://kavi.finna.fi" target="_blank" className="flex items-center justify-center underline hover:text-gray-700">
                          {rec.buildings[0].translated} <span className="ml-2 mr-5 text-gray-700 text-xs"><ExtLinkIcon /></span>
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
