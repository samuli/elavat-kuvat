import { isServer } from "@/lib/util";

export type IVideoUrl = {
  src: string;
  title: string;
  type: string;
};
export type IRecordUrl = {
  videoSources?: IVideoUrl[];
  text: string;
}
export type IFacet = {
  translated: string;
  value: string;
}
export type TRecordId = string;
export type IRecord = {
  id: TRecordId;
  title: string;
  rawData?: Record<string, any>;
  recordPage?: string;
  urls?: IRecordUrl[];
  images?: string[];
  buildings: IFacet[];
  genres?: IFacet[];
  topics?: IFacet[];
}
export type IApiResult = {
  status: string;
  resultCount: number;
}
export type ISearchResult = IApiResult & {
  records?: IRecord[];
}
export type IFacetResult = IApiResult & {
  facets?: Record<string, IFacet[]>;
}
export type TDaterangeEnd = number | '*';
export type TDaterange = [number, TDaterangeEnd];

export const clientBase = process.env.NEXT_PUBLIC_API_BASE;
export const base = isServer
  ? process.env.NEXT_PUBLIC_API_BASE_SERVER
  : clientBase;

const limit = 20;

const getFilter = (key: string, val: string) => `${key}=${encodeURIComponent(val)}`;
const getApiFilter = (key: string, val: string) => `filter[]=${`${key}:"${encodeURIComponent(val)}"`}`;

const filters = (daterange?: TDaterange) => {
  daterange = daterange || [1900, '*'];
  const filters = [
    'free_online_boolean:1',
    'datasource_str_mv:kavi',
    '~format_ext_str_mv:1/Video/Video/',
    '~format_ext_str_mv:1/Video/Short/',
    '-id:kavi.elonet_elokuva_1611548',
    '-genre_facet:katsaus'
  ];
  filters.push(`search_daterange_mv:"[${daterange[0]} TO ${daterange[1]}]"`);
  return filters.map(f => `filter[]=${encodeURIComponent(f)}`).join('&');
};

const autocompleteUrl = (lookfor: string, limit: number) => {
  const fields = ['title', 'id', 'images'].map(f => `field[]=${f}`).join('&');
  return `${base}/api/v1/search?lookfor=${encodeURIComponent(lookfor)}&${filters()}&${fields}&limit=${limit}`;
};

const searchUrl = (lookfor: string, page: number = 1, topic?: string, genre?: string, daterange?: TDaterange, resultCount: number = limit, recFields = ['title', 'id', 'images']) => {
  const queryFilters = filters(daterange)
    + (topic ? `&filter[]=topic_facet:"${encodeURIComponent(topic)}"` : '')
    + (genre ? `&filter[]=genre_facet:"${encodeURIComponent(genre)}"` : '');

  const fields = recFields.map(f => `field[]=${f}`).join('&');
  return `${base}/api/v1/search?lookfor=${encodeURIComponent(lookfor)}&${queryFilters}&${fields}&limit=${resultCount}&page=${page}`;
};

const frontPageUrl = () => {
  const randomSets = [
    ["genre_facet", "mainos"],
    ["genre_facet", "animaatio"],
    ["genre_facet", "tv-tuotanto"],
    ["genre_facet", "opetuselokuva"],
    ["genre_facet", "henkilödokumentti"],
    ["genre_facet", "ammatinkuvaus"],
    ["genre_facet", "draamadokumentti"],
    ["genre_facet", "teollisuusdokumentti"],

    ["topic_facet", "henkilöautot"],
    ["topic_facet", "tehtaat"],
    ["topic_facet", "matkailu"],
    ["topic_facet", "pankit"],
    ["topic_facet", "maisema"],
    ["topic_facet", "muoti"],
    ["topic_facet", "kahvi"],
    ["topic_facet", "kaupungit"],
    ["topic_facet", "virvoitusjuomat"],
    ["topic_facet", "hygienia"],
    ["topic_facet", "elintarvikkeet"],
    ["topic_facet", "ruoanvalmistus"],
    ["topic_facet", "maatalous"],
    ["topic_facet", "myymälät"],
    ["topic_facet", "rakennukset"],

    ["search_daterange_mv", "[1950 TO 1959]"],
    ["search_daterange_mv", "[1960 TO 1969]"],
    ["search_daterange_mv", "[1970 TO 1979]"],
    ["search_daterange_mv", "[1980 TO 2000]"],
  ];
  const randomSet = randomSets[Math.floor(Math.random() * randomSets.length)];
  const queryFilters = filters()
    + '&' + getApiFilter(randomSet[0], randomSet[1]);
  const fields = ['title', 'id', 'images'].map(f => `field[]=${f}`).join('&');
  return `${base}/api/v1/search?${queryFilters}&${fields}&limit=20&sort=first_indexed desc,id asc}`;
};

const facetsUrl = (facet: string, topicFilter?: string, genreFilter?: string, daterange?: TDaterange, lookfor?: string) => {
  const queryFilters = filters(daterange)
    + (topicFilter ? `&${getApiFilter('topic_facet', topicFilter)}` : '')
    + (genreFilter ? `&${getApiFilter('genre_facet', genreFilter)}` : '');

  const facets = `facet[]=${facet}`;
  return `${base}/api/v1/search?lookfor=${lookfor ? encodeURIComponent(lookfor) : ''}&${queryFilters}&${facets}&limit=0`;
}
const topicFacetsUrl = (lookfor?: string, topic?: string, genre?: string, daterange?: TDaterange) => facetsUrl("topic_facet", topic, genre, daterange, lookfor);
const genreFacetsUrl = facetsUrl("genre_facet");
const yearFacetsUrl = facetsUrl("main_date_str");

const recordFields = ['title', 'id', 'images', 'urls', 'recordPage', 'imageRights', 'rawData', 'buildings'];
const recordUrl = (id: TRecordId) => {
  const fields = recordFields.map(f => `field[]=${f}`).join('&');
  return `${base}/api/v1/record?id=${id}&${fields}`;
};

export {
  searchUrl,
  recordUrl,
  autocompleteUrl,
  frontPageUrl,
  genreFacetsUrl,
  topicFacetsUrl,
  yearFacetsUrl,
  limit as searchLimit,
  getFilter,
  recordFields
};
