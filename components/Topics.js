import { useState } from 'react';
import clsx from 'clsx';
import AppLink from '@/components/Link';

export const FacetStripe = ( { facet, facets, facetUrl, truncate = false } ) => (
<div className={clsx("mt-1 items-center w-full", truncate && `line-clamp-3 overflow-clip`)}>
  <ul>
    { facets.map(f => (
      <li className="inline-flex flex-auto mr-2 mb-1 px-2 py-1 bg-gradient-to-b from-gray-100 to-gray-200 rounded-md text-xs font-medium subpixel-antialiased text-gray-800 uppercase. cursor-pointer ripple-bg-white whitespace-nowrap" key={`facet-${f.value}`}>
        <AppLink prefetch={true} key={`facet-map-${f.value}`} href={facetUrl(facet, f.value)}>
          <a>
            {f.translated}
          </a>
        </AppLink>
      </li>
    )) }
  </ul>
  </div>
);
