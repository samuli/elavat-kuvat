import { useState } from 'react';
import Link from 'next/link';

const FacetCloud = ( { facet, facets } ) => (
  <ul className="flex flex-wrap">
    { facets.map(f => (
      <Link key={`facet-map-${f.value}`} href={`/search?${facet}=${encodeURIComponent(f.value)}`}>
        <li className="mr-2 mb-2 px-2 py-1 rounded-lg bg-gray-200 text-xs font-bold text-gray-600 uppercase cursor-pointer hover:bg-white" key={`facet-${f.value}`}>
          <a>{f.translated}{/*{f.count && <span className="text-gray-500"> ({f.count})</span>}*/}</a>
        </li>
      </Link>
    )) }
  </ul>
);

export const FacetStripe = ( { facet, facets } ) => (
  <div className="items-center w-full overflow-x-scroll line-clamp-3">
  <ul className="flex. flex-row.">
    { facets.map(f => (
      <Link key={`facet-map-${f.value}`} href={`/search?${facet}=${encodeURIComponent(f.value)}`}>

        <li className="inline-flex flex-auto mr-2 mb-2 px-2 py-1 rounded-lg bg-gray-200 text-xs font-bold text-gray-600 uppercase. cursor-pointer hover:bg-white whitespace-nowrap" key={`facet-${f.value}`}>
          <a>{f.translated}</a>
        </li>
</Link>
    )) }
  </ul>
  </div>
);

const Facets = ({ facet, facets, collapse = false }) => {
  const [isOpen, setIsOpen] = useState(false);

  const limit = 20;
  const collapsed = <FacetCloud facet={facet} facets={facets.slice(0,limit)} />;
  if (!collapse || facets.length < limit ) return collapsed;

  return (
    <div>
      { !isOpen && (
        <div>
          {collapsed}
          <div className="flex mt-3 text-sm uppercase cursor-pointer hover:text-gray-100" onClick={e => setIsOpen(true)}>Näytä kaikki</div>
        </div>
      ) }
      { isOpen && <FacetCloud facet={facet} facets={facets} /> }
    </div>
  );
};

export default Facets;
