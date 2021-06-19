import { useEffect, useState } from 'react';
import HeadTags from '@/components/Head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import useSWR from 'swr';
import clsx from 'clsx';
import { FaPlay as PlayIcon, FaExternalLinkAlt as ExtLinkIcon, FaQuestionCircle as InfoIcon } from 'react-icons/fa';
import { recordUrl } from '@/lib/api';
import { extractVideoUrls, finnaRecordPage } from '@/lib/record';
import { Image, ImageGrid } from '@/components/ImageGrid';
import Facets from '@/components/Topics';
import Spinner from '@/components/Spinner';
import Fetcher from '@/lib/fetcher';

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
      <span className="text-gray-300 italic mr-2">Aineiston käyttöoikeudet: </span>
      <div className="flex flex-row items-center justify-center">
        <div className="">{rightsLink}</div>
        <div className="text-gray-300 ml-1 flex jusitfy-center items-center text-xl -flex-nowrap">
          <a target="_blank" href={finnaRecordPage(record.recordPage)} className="hover:text-white ml-2" title="Katso lisätiedot Finnassa">
            <InfoIcon />
          </a>
        </div>
      </div>
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
      <h1 className="text-4xl font-bold mb-2">{record.title}</h1>
      <p className="text-md text-gray-100">
        {d.author_corporate && `${d.author_corporate} `}{d.main_date_str && d.main_date_str}
      </p>
    </div>
  );
};


const PlayButton = () => (
  <div className="bg-white text-gray-900 group-hover:bg-pink-500 group-hover:text-gray-100 fill-current stroke-current rounded-full items-center justify-center flex w-16 h-16 sm:w-24 sm:h-24 lg:w-32 lg:h-32 text-2xl sm:text-4xl"><div className="ml-2"><PlayIcon /></div></div>
);

const SmallPlayButton = () => (
  <div className="text-gray-100 group-hover:text-pink-500 fill-current stroke-current items-center justify-center flex text-sm">
    <div className="ml-1"><PlayIcon /></div>
  </div>
);

const Preview = ({ images = [], videoAvailable, recordUrl }) => {
  return (
    <div className="flex relative justify-center bg-gradient-to-b from-gray-900 to-gray-800 rounded-xl group cursor-pointer min-h-64">
      <div>
        <Image key={images[0]} src={images[0]} width="700" style={{ minHeight: '200px' }} />
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
    ? <Link href={videoPage(record.id)}><a>{children}</a></Link>
    : <a href={finnaRecordPage(record.recordPage)} target="_blank">{children}</a>;
};

const Tags = ({ topics, genres }) => (
  <div>
    { topics.length > 0 && <div className="my-4">
      <h2 className="text-xl mb-2">Aiheet:</h2>
      <Facets facet="topic_facet" facets={topics.map(f => {
        return { value: f, translated: f };
      })} collapse={true} />
    </div>}
    { genres.length > 0 && <div className="my-4">
      <h2 className="text-xl mb-2">Genret:</h2>
      <Facets facet="genre_facet" facets={genres.map(f => {
        return { value: f, translated: f };
      })} collapse={true} />
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
      setLoading(true);
    },
    onError: (_err, _key, config) => {
      setLoading(false);
    },
    onSuccess: (_data, _key, _config) => {
      setLoading(false);
    }
  };

  const { data, error, ...rest } = useSWR(id ? recordUrl(id) : null, Fetcher, opt);

  if (!id) return "";

  const rec = data && !error && data.resultCount > 0 && data.records[0];

  if (error) return <p>error...</p>;

  const videoUrls = rec ? extractVideoUrls(rec) : [];
  const videoAvailable = videoUrls.length > 0;

  return (
    <div className="w-auto mx-7 font-sans">
      <HeadTags />
      { loading && <Spinner />}
      <div>
        <div className="mt-4">
          {!loading && data && (
            <>
              <div className="flex flex-col md:flex-row">
                <div className="md:w-3/5 w-full">
                  <PreviewWrapper record={rec} videoAvailable={videoAvailable}>
                    <Preview images={rec?.images} videoAvailable={videoAvailable} recordUrl={finnaRecordPage(rec.recordPage)} />
                  </PreviewWrapper>
                </div>
                <div className="md:ml-8 flex items-center mt-8 md:mt-0">
                  <div>
                    <Header record={rec} />
                    {videoUrls.length > 1 && <ul className="mt-5">{videoUrls.map(({ src, title }, idx) => (
                      <Link href={videoPage(rec.id, idx + 1)}><a>
                        <li className="flex my-2 items-center group text-gray-100 hover:text-white">
                          <SmallPlayButton big={false} /><div className="ml-3">{title}</div>
                        </li>
                      </a></Link>
                    ))}</ul>}
                  </div>
                </div>
              </div>
              {rec.rawData.description && <p className="mt-4 whitespace-pre-line leading-6 text-lg">{rec.rawData.description.replace(/<br( )?\/>/g, '\n')}</p>}

              <div className="my-5 flex flex-row">
                {rec.buildings && (
                  <div className=".my-2 flex flex-col .flex-wrap">
                    <div className="mr-2 italic text-gray-300">Aineiston tarjoaa: </div>
                    <div className="">
                      <a href="https://kavi.finna.fi" target="_blank">
                        {rec.buildings[0].translated}
                      </a>
                    </div>
                  </div>)}
                <div className="ml-4 md:ml-8"><Copyright record={rec} /></div>
              </div>
              <Tags topics={rec.rawData.topic_facet ?? []} genres={rec.rawData.genres_facet ?? []} />
            </>
          )}
        </div>
      </div>
    </div>
  )
}
