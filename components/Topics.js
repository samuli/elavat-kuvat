import { useState } from 'react';
import Link from 'next/link';
import clsx from 'clsx';

// const FacetCloud = ( { facet, facets } ) => (
//   <ul className="flex flex-wrap">
//     { facets.map(f => (
//       <Link key={`facet-map-${f.value}`} href={`/search?${facet}=${encodeURIComponent(f.value)}`}>
//         <li className="mr-2 mb-2 px-2 py-1 rounded-lg bg-gray-200 text-xs font-bold text-gray-600 uppercase cursor-pointer hover:bg-white" key={`facet-${f.value}`}>
//           <a>{f.translated}{/*{f.count && <span className="text-gray-500"> ({f.count})</span>}*/}</a>
//         </li>
//       </Link>
//     )) }
//   </ul>
// );

export const FacetStripe = ( { facet, facets, facetUrl, truncate = false } ) => (
<div className={clsx("items-center w-full", truncate && `line-clamp-3 overflow-clip`)}>
  <ul className="flex. flex-row.">
    { facets.map(f => (
      <Link key={`facet-map-${f.value}`} href={facetUrl(facet, f.value)}>
        <a>
        <li className="inline-flex flex-auto mr-2 mb-1 px-2 py-1 bg-gradient-to-b from-gray-100 to-gray-200 rounded-md text-xs font-bold text-gray-600 uppercase. cursor-pointer hover:from-white hover:to-white whitespace-nowrap" key={`facet-${f.value}`}>
            <a>{f.translated}</a>
         </li>
        </a>
      </Link>
    )) }
  </ul>
  </div>
);

// export const FacetList = ( { facet, facets, facetUrl } ) => (
// <div className="items-center w-full overflow-x-scroll">
//   <ul className="flex. flex-row.">
//     { facets.map(f => (
//       <Link key={`facet-map-${f.value}`} href={facetUrl(facet, f.value)}>
//         <a>
//         <li className="flex flex-row mb-1. py-1. text-md font-bold text-gray-100 uppercase. cursor-pointer hover:bg-white whitespace-nowrap" key={`facet-${f.value}`}>
//             <a>{f.translated}</a>
//          </li>
//         </a>
//       </Link>
//     )) }
//   </ul>
//   </div>
// );

// const Facets = ({ facet, facets, collapse = false }) => {
//   const [isOpen, setIsOpen] = useState(false);

//   const limit = 20;
//   const collapsed = <FacetCloud facet={facet} facets={facets.slice(0,limit)} />;
//   if (!collapse || facets.length < limit ) return collapsed;

//   return (
//     <div>
//       { !isOpen && (
//         <div>
//           {collapsed}
//           <div className="flex mt-3 text-sm uppercase cursor-pointer hover:text-gray-100" onClick={e => setIsOpen(true)}>Näytä kaikki</div>
//         </div>
//       ) }
//       { isOpen && <FacetCloud facet={facet} facets={facets} /> }
//     </div>
//   );
// };

// export default Facets;
