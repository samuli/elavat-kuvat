import { useEffect, useState } from 'react';
import Head from 'next/head'
import Link from 'next/link';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import useSWR from 'swr';
import clsx from 'clsx';
import { FaPlay as PlayIcon, FaExternalLinkAlt as ExtLinkIcon } from 'react-icons/fa';
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
    <div>
      <span className="text-gray-300 italic">Aineiston käyttöoikeudet: </span><span className="ml-2">{rightsLink}</span> <span className="text-gray-300 ml-1">(lisätietoja: <a target="_blank" href={  finnaRecordPage(record.recordPage)} className="underline hover:no-underline">Finna.fi</a>)</span>
    </div>
  );
};

const Authors = ({ record }) => {
  return (
    <ul className="flex flex-wrap">
      { record.nonPresenterAuthors.map((author,idx) => <li key={`${idx}-${author.name}`}>{author.name}</li> ) }
    </ul>
  );
};

const Header = ({ record }) => {
  const d = record.rawData;
  return (
    <div>
      <h1 className="text-4xl mb-2">{record.title}</h1>
      <p className="text-lg">{ d.author_corporate && `${d.author_corporate} ` }{ d.main_date_str && d.main_date_str}</p>
      {/* <Authors record={record} /> */}
    </div>
  );
};


const PlayButton = () => (
  <div className="bg-white text-gray-900 group-hover:bg-pink-500 group-hover:text-gray-100 fill-current stroke-current rounded-full items-center justify-center flex w-32 h-32 text-4xl"><div className="ml-2"><PlayIcon/></div></div>
);

const SmallPlayButton = () => (
  <div className="text-gray-100 group-hover:text-pink-500 fill-current stroke-current items-center justify-center flex text-sm"><div className="ml-1"><PlayIcon/></div></div>
);

const Preview = ({ images = [], videoAvailable, recordUrl }) => {
  return (
    <div className="flex relative justify-center bg-gradient-to-b from-gray-900 to-gray-800 rounded-xl group cursor-pointer">
      { images.slice(0,1).map((img, idx) => (
        <div key={idx} className="">
          <Image key={img} src={img} width="700" />
        </div> ))}
        <div className="absolute align-middle p-10 self-center align-center justify-center flex cursor-pointer">
          { videoAvailable && <PlayButton big={true}/> }
          { !videoAvailable && (
            <div className="flex items-center justify-center text-2xl p-4 rounded-md bg-white text-gray-900 group-hover:bg-pink-500 group-hover:text-gray-100">Katso finna.fi:ssä
              <span className="ml-4"><ExtLinkIcon /></span>
            </div>) }
        </div>
    </div>
  );
};

const videoPage = (id, clip = 1) => `/play?id=${encodeURIComponent(id)}&clip=${clip}`;

const PreviewWrapper = ({ children, record, videoAvailable }) => {
  return videoAvailable
    ? <Link href={videoPage(record.id)}><a>{ children }</a></Link>
    : <a href={finnaRecordPage(record.recordPage)} target="_blank">{ children }</a>;
};

export default function View() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const id = router.query.id;


  console.log("id: %o", id);
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

  console.log("2: %o", [error, rec]);
  if (error) return <p>error...</p>;


  const videoUrls = rec ? extractVideoUrls(rec) : [];
  const videoAvailable = videoUrls.length > 0;

  return (
    <div className="w-auto mx-7 font-sans">
      <Head>
        <title>SWR search</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
        { loading && <Spinner /> }
        { data && (

      <div>
            <div className="flex flex-col gap-x-10 gap-y-5 md:flex-row">
              <div className="md:w-3/5 w-full">
                <PreviewWrapper record={rec} videoAvailable={videoAvailable}>
                  <Preview images={rec?.images} videoAvailable={videoAvailable} recordUrl={finnaRecordPage(rec.recordPage)} />
                </PreviewWrapper>
              </div>
              <div className="flex items-center">
                <div>
                  <Header record={rec} />
                  { videoUrls.length > 1 && <ul className="mt-5">{ videoUrls.map(({src, title}, idx) => (
                    <Link href={videoPage(rec.id, idx+1)}><a>
                      <li className="flex my-2 items-center group text-gray-100 hover:text-white">
                        <SmallPlayButton big={false} /><div className="ml-3">{title}</div>
                      </li>
                    </a></Link>
                  )) }</ul> }
                </div>
              </div>
            </div>

        <div className="mt-5 mb-3">
          { rec.buildings && <p className="mt-2"><span className="italic text-gray-300">Aineiston tarjoaa: </span><span className="ml-2">{rec.buildings[0].translated}</span></p> }
          <Copyright record={rec} />
        </div>
        { rec.rawData.topic_facet &&
          <div className="my-4">
             <h2 className="text-xl mb-2">Aiheet:</h2>
            <Facets facet="topic_facet" facets={rec.rawData.topic_facet.map(f => {
              return { value: f, translated: f };
            })} collapse={true} />
          </div> }
        { rec.rawData.genre_facet &&
          <div className="my-4">
             <h2 className="text-xl mb-2">Genret:</h2>
             <Facets facet="genre_facet" facets={rec.rawData.genre_facet.map(f => {
              return { value: f, translated: f };
            })} collapse={true} />
          </div> }

        { rec.rawData.description && <p className="mt-10 whitespace-pre-line leading-6 text-lg">{rec.rawData.description.replace(/<br( )?\/>/g, '\n')}</p>}
      </div>
        ) }
          </div>
  )
}
