import Link from 'next/link';
import clsx from 'clsx';
import { extractVideoUrls } from '@/lib/record';

const imageH = 300;

export const Image = ({ src, width = 300, height = 300 }) => <img src={`https://api.finna.fi${src}&w=${width}`} className="w-auto rouded-xl overflow-hidden" style={{ }} />;

export const ResultGrid = ({ records, onOpenRecord, width = 500, height = 500 }) => (
  <div>
    <ul className="flex flex-row flex-wrap justify-between">
      {records?.map(rec => {
        const playable = extractVideoUrls(rec).length > 0;
        return (
          <Link key={rec.id} href={`/view?id=${encodeURIComponent(rec.id)}`}>
            <li className={clsx("w-full sm:w-1/2 lg:w-1/3 mb-4 flex flex-col rounded-xl cursor-pointer group")} style={{  }}>
              <div className="flex flex-col">
                  <div className="flex items-center p-3">
                    { rec.images &&
                      <div className="flex overflow-hidden w-full"
                           style={{
                               height: '300px',
                               maxHeight: '400px',
                               backgroundImage: `url(https://api.finna.fi${rec.images[0]}&w=400)`,
                               backgroundPosition: 'center',
                               backgroundRepeat: 'no-repeat',
                               backgroundSize: 'cover',

                           }}>
                      </div> }
                  </div>
                <div className="w-full bg-gray-900 px-2 text-center text-gray-200 overflow-hidden text-xl line-clamp-2 group-hover:text-white">{rec.title}</div>
              </div>
            </li>
          </Link>
        );
      })}
    </ul>
  </div>
);

export const ImageGrid = ({ images }) => (
  <div>
    <div className="flex flex-wrap">
      {images.map(img => (
          <Image className="mt-2 p-3" key={img} src={img} width="500" height="400" />
      ))}
    </div>
  </div>
);
