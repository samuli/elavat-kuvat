import Link from 'next/link';
import clsx from 'clsx';
import { extractVideoUrls } from '@/lib/record';

const imageH = 300;

export const Image = ({ src, width = 300, height = 300 }) => <img src={`https://api.finna.fi${src}&w=${width}`} className="w-auto rouded-xl overflow-hidden" style={{ maxHeight: '${imageH}px' }}/>;

export const ResultGrid = ({ records, onOpenRecord, width = 500, height = 500 }) => (
  <div>
    <ul className="grid sm:grid-cols-2 lg:grid-cols-3">
      {records?.map(rec => {
        const playable = extractVideoUrls(rec).length > 0;
        return (
          <Link key={rec.id} href={`/view?id=${encodeURIComponent(rec.id)}`}>
            <li className={clsx("mb-4 flex flex-col rounded-xl cursor-pointer group")} style={{  }}>
              <div className="flex flex-col justify-between h-full">
                  <div className="flex items-center p-3 rounded-lg">
                    { rec.images && <div className="flex h-auto overflow-hidden w-full" style={{ height: '${imageH}px' }}><Image src={rec.images[0]} width="550" /></div> }
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
