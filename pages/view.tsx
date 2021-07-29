import { FacetStripe } from "@/components/Topics";
import { SearchHeading } from "@/components/Typo";
import AppError from "@/components/AppError";
import { recordUrl, IVideoUrl, ISearchResult } from "@/lib/api";
import {
  extractVideoUrls,
  finnaRecordPage,
  recordUrl as recordPageUrl,
  getField as getRecordField,
} from "@/lib/record";
import {
  appUrl,
  facetSearchUrl,
  getPageTitle,
  isServer,
  trackPageView,
  useProgress,
} from "@/lib/util";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import {
  FaExternalLinkAlt as ExtLinkIcon,
  FaPlay as PlayIcon,
} from "react-icons/fa";
import FadeIn from "react-lazyload-fadein";
import ReactPlayer from "react-player/file";
import { useQuery, UseQueryResult } from "react-query";
import FilePlayer from "react-player/file";

const Copyright = ({ record }) => {
  const copyright = record.imageRights?.copyright;
  const url = record.imageRights?.link;

  let rightsLink = copyright;
  if (copyright && url) {
    rightsLink = (
      <a href={url} target="_blank" rel="noopener noreferrer">
        {rightsLink}
      </a>
    );
  }

  return (
    <div className="flex flex-col">
      <span className="uppercase text-xs font-bold">
        Aineiston käyttöoikeudet:{" "}
      </span>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href={finnaRecordPage(record.recordPage)}
        className="hover:text-gray-800"
        title="Katso lisätiedot Finnassa"
      >
        <div className="text-sm flex flex-row items-center">
          <div className="underline">{rightsLink}</div>
          <div className="text-gray-600 ml-1 flex jusitfy-center items-center text-xl">
            <span className="text-xs ml-2 ">
              <ExtLinkIcon />
            </span>
          </div>
        </div>
      </a>
    </div>
  );
};

const Header = ({ record }) => {
  return (
    <div>
      <h1 className="text-xl md:text-3xl font-bold">{record.title}</h1>
      <p className="text-md text-gray-100">
        {getRecordField(record, "author_corporate")}
        {` ${getRecordField(record, "main_date_str")}`}
      </p>
    </div>
  );
};

const PlayButtonWrapper = ({ children }) => (
  <div className="flex items-center justify-center font-semibold text-lg px-4 py-3 rounded-xl bg-gradient-to-b from-pink-500 to-red-500 text-gray-100 border-2 border-red-500">
    {children}
  </div>
);

const PlayButton = () => (
  <PlayButtonWrapper>
    <div className="ml-2 flex items-center uppercase text-sm">
      Katso{" "}
      <span className="ml-2 text-xs">
        <PlayIcon />
      </span>
    </div>
  </PlayButtonWrapper>
);

const SmallPlayButton = () => (
  <div className="text-gray-100 group-hover:text-white fill-current stroke-current items-center justify-center flex text-sm">
    <div className="ml-1">
      <PlayIcon />
    </div>
  </div>
);

const Preview = ({ imageUrl }) => {
  return (
    <div className="flex relative items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800 rounded-xl group cursor-pointer min-h-64">
      <div className="w-full h-full">
        <div className="aspect-w-5 aspect-h-4">
          {imageUrl && (
            <FadeIn
              duration={300}
              render={(onload) => (
                <img
                  onLoad={onload}
                  alt="Esikatselukuva"
                  src={imageUrl}
                  className="w-auto rouded-xl overflow-hidden object-cover object-center"
                />
              )}
            />
          )}
        </div>
      </div>
      <div className="absolute align-middle p-10 self-center align-center justify-center flex cursor-pointer">
        <PlayButtonWrapper>
          Katso Finnassa
          <span className="text-lg ml-4">
            <ExtLinkIcon />
          </span>
        </PlayButtonWrapper>
      </div>
    </div>
  );
};

const Tags = ({ topics, genres }) => (
  <div>
    {topics.length > 0 && (
      <div className="mb-2">
        <SearchHeading title="Aiheet" />
        <FacetStripe
          facet="topic_facet"
          facets={topics.map((f) => {
            return { value: f, translated: f };
          })}
          facetUrl={facetSearchUrl}
        />
      </div>
    )}
    {genres.length > 0 && (
      <div>
        <SearchHeading title="Genret" />
        <FacetStripe
          facet="genre_facet"
          facets={genres.map((f) => {
            return { value: f, translated: f };
          })}
          facetUrl={facetSearchUrl}
        />
      </div>
    )}
  </div>
);

const Description = ({ text }) => {
  const parts = text.replace(/<br( )?\/>/g, "\n").split("\n");
  const collapse = parts.length > 1;
  return (
    <div className="mt-4 leading-snug text-md">
      {collapse && (
        <details>
          <summary className="cursor-pointer whitespace-pre-line outline-none">
            {parts[0]}
          </summary>
          {parts.length > 1 && (
            <div>
              {parts.slice(1).map((el: string, idx: number) => (
                <p className="pt-2" key={`detail-${idx}`}>
                  {el}
                </p>
              ))}
            </div>
          )}
        </details>
      )}
      {!collapse && <p>{parts[0]}</p>}
    </div>
  );
};

interface ViewParams {
  id?: string;
  recordData?: object;
}

export default function View({ recordData }: ViewParams) {
  const router = useRouter();
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [videoStarted, setVideoStarted] = useState(false);
  const [pauseVideo, setPauseVideo] = useState(true);
  const videoRef = useRef<FilePlayer>(null);

  const id = (router.query.id || "").toString();

  const { data, error, isFetching }: UseQueryResult<ISearchResult> = useQuery(
    recordUrl(id),
    {
      enabled: !!id,
      initialData: recordData,
      onSuccess: (data: ISearchResult) => {
        if (data.resultCount > 0) {
          if (data?.records) {
            const urls = extractVideoUrls(data.records[0]);
            if (urls.length > 0) {
              setVideoUrl(urls[0].src);
            }
          }
        }
      },
    }
  );

  useProgress(isFetching);

  const rec =
    data && !error && data.resultCount > 0 && data.records && data.records[0];

  if (error || (!isFetching && data && data.status === "ERROR"))
    return <AppError />;

  const imageUrl =
    rec && rec.images ? `https://api.finna.fi${rec.images[0]}` : null;
  const recTitle = rec ? rec.title : "";
  const recDescription = rec && rec.rawData?.description;
  const recTopics = (rec && rec.topics) || [];
  const recGenres = (rec && rec.genres) || [];

  return (
    <>
      {!isServer && (
        <NextSeo
          noindex={true}
          nofollow={true}
          title={getPageTitle(recTitle)}
          description={recDescription}
          openGraph={{
            title: getPageTitle(recTitle),
            description: recDescription,
            url: `${appUrl}${recordPageUrl(id)}`,
            type: "video.movie",
            images: [
              {
                url: imageUrl || "",
                alt: "Preview",
              },
            ],
          }}
        />
      )}
      <div className="w-auto font-sans">
        <div className="mt-3">
          <article>
            {!isFetching && rec && (
              <>
                <div className="flex flex-col w-full max-w-2xl">
                  <div className="aspect-w-4 aspect-h-3 overflow-hidden">
                    {videoUrl && (
                      <ReactPlayer
                        ref={videoRef}
                        className="react-player -mt-2"
                        url={videoUrl || ""}
                        width="100%"
                        height="100%"
                        playing={true}
                        controls
                        muted
                        pip={false}
                        playIcon={<PlayButton />}
                        light={
                          pauseVideo && !videoStarted && rec.images
                            ? `https://api.finna.fi${rec.images[0] || ""}`
                            : false
                        }
                        onStart={() => {
                          trackPageView(
                            router.asPath.replace("/view", "/play")
                          );
                          setVideoStarted(true);
                        }}
                        onEnded={() => {
                          setVideoStarted(false);
                          if (videoRef.current) {
                            videoRef.current.showPreview();
                          }
                        }}
                      />
                    )}
                    {!videoUrl && (
                      <a
                        href={finnaRecordPage(rec?.recordPage || "")}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Preview imageUrl={imageUrl ? imageUrl : null} />
                      </a>
                    )}
                  </div>
                  <div className="flex flex-col justify-center mt-2">
                    <Header record={rec} />
                    {rec && rec?.urls && rec.urls.length > 1 && (
                      <ul className="mt-5">
                        {extractVideoUrls(rec).map((url: IVideoUrl) => (
                          <li
                            key={url.src}
                            onClick={() => {
                              setVideoUrl(url.src);
                              setPauseVideo(false);
                              if (videoRef.current) {
                                videoRef.current.seekTo(0);
                              }
                            }}
                            className="flex my-2 items-center group text-md text-gray-200 hover:text-white cursor-pointer"
                          >
                            <SmallPlayButton />
                            <div className="ml-3">{url.title}</div>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
                <div className="max-w-2xl">
                  {recDescription && <Description text={recDescription} />}
                  <div className="my-5 inline-flex flex-col sm:flex-row bg-yellow-50 text-gray-900 p-3 rounded-md">
                    {rec.buildings && (
                      <div className="flex flex-col">
                        <div className="mr-2 uppercase text-xs font-bold">
                          Aineiston tarjoaa:{" "}
                        </div>
                        <div className="flex text-sm">
                          <a
                            href="https://kavi.finna.fi"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center underline hover:text-gray-700"
                          >
                            {rec.buildings[0].translated}{" "}
                            <span className="ml-2 mr-5 text-gray-700 text-xs">
                              <ExtLinkIcon />
                            </span>
                          </a>
                        </div>
                      </div>
                    )}
                    <div className="sm:mt-0 mt-2">
                      <Copyright record={rec} />
                    </div>
                  </div>
                  <Tags topics={recTopics} genres={recGenres} />
                </div>
              </>
            )}
          </article>
        </div>
      </div>
    </>
  );
}
