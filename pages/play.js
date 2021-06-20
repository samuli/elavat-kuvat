import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import useSWR from 'swr';
import AppLink from '@/components/Link';
import { recordUrl } from '@/lib/api';
import { extractVideoUrls, finnaRecordPage } from '@/lib/record';
import Fetcher from '@/lib/fetcher';
import { FullscreenLayout } from '@/components/layout';
import ReactPlayer from 'react-player/file'
import { FaArrowLeft as BackIcon } from 'react-icons/fa';
import HeadTags from '@/components/Head';

function Play() {
  const router = useRouter();
  const [ playerOpen, setPlayerOpen ] = useState(true);
  const [ showUI, setShowUI ] = useState(false);
  const [ videoStarted, setVideoStarted ] = useState(false);
  const timerRef = useRef(null);
  const mouseListenerRef = useRef(null);

  useEffect(() => {
    mouseListenerRef.current = window.addEventListener("mousemove", _e => {
      if (showUI) return;
      setShowUI(true);
      timerRef.current && clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setShowUI(false), 2000);
    });
    return () => {
      timerRef.current && clearTimeout(timerRef.current);
      window.removeEventListener("mousemove", mouseListenerRef.current);
    }
  }, []);

  const id = router.query.id;
  const clip = router.query.clip || 1;

  const { data, error, loading, ...rest } = useSWR(id ? recordUrl(id) : null, Fetcher);
  const rec = data && !error && data.resultCount > 0 && data.records[0];

  if (loading) return <p>loading...</p>;
  if (!loading && data && !rec) return <p>error...</p>;

  const videoUrls = extractVideoUrls(rec);
  const videoUrl = videoUrls[clip-1];

  return (
    <div className="w-full w-screen p-5 font-sans">
      <HeadTags />
      <div>
        { rec && (
          <div
            onMouseEnter={() => setShowUI(true)}
            onMouseLeave={() => { if (videoStarted) setShowUI(false) }}
          >
            <div className={clsx('flex absolute top-0 z-50 px-5 py-3 rounded-xl mt-5 bg-gray-900 .items-center transition transition-opacity duration-500 ease-in-out', !showUI && 'opacity-0')}>
              <div className="flex items-center">
                <div className="flex items-center text-grey-100 hover:text-grey-200 cursor-pointer"><BackIcon /> <div class="ml-2 hover:text-gray-200"><AppLink href={`/view?id=${encodeURIComponent(rec.id)}`}><a>Takaisin</a></AppLink></div></div>
                <h1 className="ml-10 text-lg line-clamp-1">{ rec.title }<span className="ml-3 text-xl text-gray-400">{ videoUrls.length > 1 ? ` (osa ${clip}/${videoUrls.length})` : '' }</span></h1>
              </div>
            </div>
            <ReactPlayer
              className='react-player'
              url={videoUrl.src}
              width='100%'
              height='100%'
              playing={true}
              controls
              muted
              onStart={() => {
                setShowUI(false);
                setVideoStarted(true);
              }}
            />
          </div>
        ) }
      </div>
    </div>
  )
}

Play.layout = FullscreenLayout;

export default Play;
