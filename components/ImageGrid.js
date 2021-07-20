import React from 'react';
import clsx from 'clsx';
import { FadeIn } from 'react-lazyload-fadein';
import { extractVideoUrls } from '@/lib/record';
import AppLink from '@/components/Link';

export const Image = ({ src, width = 300, height = 300, style = {} }) => <img src={`https://api.finna.fi${src}&w=${width}`} className="w-auto rouded-xl overflow-hidden" alt="Esikatselukuva" style={style} />;

const wrapItem = (id, children) => {
  return !id
    ? children
    : <AppLink key={id} href={`/view?id=${encodeURIComponent(id)}`}><a>{children}</a></AppLink>;
};

export const ResultGrid = ({ records, lazy = true }) => (
  <div>
    <ul className="flex flex-row flex-wrap overflow-hidden.">
      {records?.map((rec,i) => (
        <li key={`record-${i}`} className={clsx("px-1 mt-2 w-1/2 sm:w-1/3 md:w-1/4 h-full flex flex-col group", rec?.id && "cursor-pointer")} >
          { wrapItem(rec?.id || null, (
            <div className="flex flex-col rounded-sm" style={{ backgroundColor: 'rgb(21, 30, 50)' }}>
              <div className="overflow-hidden aspect-w-5 aspect-h-4">
                {rec?.images.length > 0 && <FadeIn duration={300} offset={100} render={onload => (
                  <img className="object-none object-center"
                    src={`https://api.finna.fi${rec.images[0]}&w=300`} alt="Esikatselukuva" onLoad={onload}
                  />) } />
            }
              </div>
              <div className="w-full py-2 px-3 text-center text-gray-200 truncate text-xs overflow-ellipsis group-hover:text-white">{rec?.title || ""}</div>
            </div>
          ))}
        </li>
      ))}
    </ul>
  </div>
);
