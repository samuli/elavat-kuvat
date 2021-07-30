import clsx from 'clsx';

import AppLink from '@/components/Link';
import { facetBrowseUrl } from '@/lib/util';

type FacetStripeProps = {
  facet: string;
  facets: string[];
  facetUrl: typeof facetBrowseUrl;
  truncate?: boolean;
};
export const FacetStripe = ({
  facet,
  facets,
  facetUrl,
  truncate = false,
}: FacetStripeProps): React.ReactElement => (
  <div className={clsx('mt-1 items-center w-full', truncate && `line-clamp-3 overflow-clip`)}>
    <ul>
      {facets.map((f: string) => (
        <AppLink prefetch={true} key={`facet-${f}`} href={facetUrl(facet, f)}>
          <a>
            <li
              className="inline-flex flex-auto mr-2 mb-1 px-2 py-1 bg-gradient-to-b from-gray-100 to-gray-200 rounded-md text-xs font-medium subpixel-antialiased text-gray-800 uppercase. cursor-pointer ripple-bg-white whitespace-nowrap"
              key={`facet-${f}`}>
              {f}
            </li>
          </a>
        </AppLink>
      ))}
    </ul>
  </div>
);
