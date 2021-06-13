import { useState } from 'react';
import Link from 'next/link';

const FacetCloud = ( { facet, facets } ) => (
  <ul className="flex flex-wrap gap-x-2 gap-y-2">
    { facets.map(f => (
      <Link key={`facet-map-${f.value}`} href={`/search?${facet}=${encodeURIComponent(f.value)}`}>
        <li className="px-2 py-1 rounded-lg bg-gray-200 text-sm font-bold text-gray-600 uppercase cursor-pointer hover:bg-white" key={`facet-${f.value}`}>
          <a>{f.translated}{/*{f.count && <span className="text-gray-500"> ({f.count})</span>}*/}</a>
        </li>
      </Link>
    )) }
  </ul>
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
