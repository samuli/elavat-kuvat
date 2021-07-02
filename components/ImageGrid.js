import clsx from 'clsx';
import LazyLoad from 'react-lazyload';
import { extractVideoUrls } from '@/lib/record';
import AppLink from '@/components/Link';

export const Image = ({ src, width = 300, height = 300, style = {} }) => <img src={`https://api.finna.fi${src}&w=${width}`} className="w-auto rouded-xl overflow-hidden" alt="" style={style} />;

const wrapItem = (id, children) => {
  return !id
    ? children
    : <AppLink key={id} href={`/view?id=${encodeURIComponent(id)}`}><a>{children}</a></AppLink>;
};

const wrapImage = (lazy, children) => {
  return lazy
    ? <LazyLoad offset={100} once>{children}</LazyLoad>
    : children;
}

export const ResultGrid = ({ records, lazy = true }) => (
  <div>
    <ul className="flex flex-row flex-wrap justify-between. overflow-hidden.">
      {records?.map((rec,i) => (
        <li key={`record-${i}`} role="button" className={clsx("px-1 mb-3 w-1/2 sm:w-1/3 md:w-1/4 h-full flex flex-col group", rec?.id && "cursor-pointer")} >
          { wrapItem(rec?.id || null, (

            <div className="flex flex-col">
              <div className="overflow-hidden aspect-w-5 aspect-h-4">
                {rec?.images.length > 0 && wrapImage(lazy,
                  <img className="object-cover object-center"
                    src={`https://api.finna.fi${rec.images[0]}&w=300`} alt=""
                  />
                )}
              </div>
              <div className="w-full bg-gray-900 pt-2 px-3 text-center text-gray-200 overflow-hidden text-sm md:text-md line-clamp-2 h-10 group-hover:text-white leading-tight">{rec?.title || ""}</div>
            </div>
          ))}
        </li>
      ))}
    </ul>
  </div>
);
