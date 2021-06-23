import clsx from 'clsx';
import LazyLoad from 'react-lazyload';
import { extractVideoUrls } from '@/lib/record';
import AppLink from '@/components/Link';

export const Image = ({ src, width = 300, height = 300, style = {} }) => <img src={`https://api.finna.fi${src}&w=${width}`} className="w-auto rouded-xl overflow-hidden" style={style} />;

export const ResultGrid = ({ records, onOpenRecord, width = 500, height = 500 }) => (
  <div>
    <ul className="flex flex-row flex-wrap line-clamp-2.">
      {records?.map(rec => {
        const playable = extractVideoUrls(rec).length > 0;
        return (
          <AppLink key={rec.id} href={`/view?id=${encodeURIComponent(rec.id)}`}>
            <li role="button" className={clsx("w-1/2 sm:w-1/3 md:w-1/4 h-full flex flex-col rounded-xl cursor-pointer group")} style={{  }}>
              <div className="flex flex-col h-full.">
                  <div className="flex items-center h-full p-3">
                    <figure>
                    { rec.images &&
                      <div className="flex items-center justify-center bg-gray-900 overflow-hidden w-full" style={{ minHeight: '100px' }}>
                        <LazyLoad height={300} offset={100}>
                          <img className=""
                            src={`https://api.finna.fi${rec.images[0]}&w=400`} width="300"
                             style={{
                                 width: '100%',
                                 height: 'auto',
                                 maxHeight: '300px',
                          }} />
                        </LazyLoad>
                      </div> }
                    </figure>
                  </div>
                <div className="w-full bg-gray-900 px-2 text-center text-gray-200 overflow-hidden text-sm md:text-md line-clamp-2 group-hover:text-white -mt-2 leading-tight">{rec.title}</div>
              </div>
            </li>
          </AppLink>
        );
      })}
    </ul>
  </div>
);

// export const ImageGrid = ({ images }) => (
//   <div>
//     <div className="flex flex-wrap">
//       {images.map(img => (
//           <Image className="mt-2 p-3" key={img} src={img} width="500" height="400" />
//       ))}
//     </div>
//   </div>
// );
