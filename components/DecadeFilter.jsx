import Link from 'next/link';
import { yearTitle } from '@/lib/util';
import { getFilter } from '@/lib/api';

export const decades = [1950, 1960, 1970, 1980, 1990, 2000];

export const getSearchUrl = (startYear, topic, genre) => {
  const filters =
    (topic ? getFilter('topic_facet', topic) : '')
    + (genre ? getFilter('genre_facet', genre) : '');
  const endYear = startYear < 2000 ? startYear+9 : "*";
  const queryFilters = filters ? `&${filters}` : '';
  return `/search?date=${startYear}-${endYear}${queryFilters}`;
}

const DecadeFilter = ({ title, startYear, filters = ''}) => {
  const endYear = startYear < 2000 ? startYear+9 : "*";
  const queryFilters = filters ? `&${filters}` : '';
  return (
    <Link href={`/search?date=${startYear}-${endYear}${queryFilters}`}><a>
      <div className="text-lg font-semibold uppercase bg-gray-100 text-gray-700 py-2 px-4 first:rounded-xl cursor-pointer hover:text-pink-500">
        {title}
      </div>
    </a></Link>
);
};

const DecadeFilters = ({ topic, genre }) => {
  const filters =
    (topic ? getFilter('topic_facet', topic) : '')
    + (genre ? getFilter('genre_facet', genre) : '');

  return (
    <ul className="flex flex-wrap mt-2">
      { decades.map(year => (
        <li key={`decade-${year}`} className="mb-2 first:rounded-xl">
          <DecadeFilter startYear={year} title={yearTitle(year)} filters={filters} />
        </li>
      ))}
    </ul>
  );
};

export default DecadeFilters;
