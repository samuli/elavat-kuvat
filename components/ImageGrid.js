import Link from 'next/link';

export const Image = ({ src, width = 300, height = 300 }) => <img src={`https://api.finna.fi${src}&w=${width}`} width={width} height={height} />;

export const ResultGrid = ({ records, onOpenRecord, width = 500, height = 500 }) => (
  <div>
    <ul className="flex flex-wrap">
      {records?.map(rec => (
          <Link key={rec.id} href={`/view?id=${encodeURIComponent(rec.id)}`}>
            <li className="xl:w-1/3 lg:w-1/2 w-full mb-4 flex hover:bg-pink-500 rounded-xl .p-2 cursor-pointer">
              <a className="">
                <div className="flex">
                  { rec.images && <div className="rounded-lg overflow-hidden"><Image src={rec.images[0]} width={width} height={height} /></div> }
                  <div className="ml-2">
                    <div className="text-2xl">{rec.title}</div>
                    <div>{ rec.corporateAuthors && rec.corporateAuthors.join(", ") }{ rec.year && ` ${rec.year}` }</div>
                  </div>
                </div>
              </a>
            </li>
          </Link>
      ))}
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
