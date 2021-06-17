const base = 'http://localhost:3001';
//const base = 'https://api.finna.fi';

const limit = 50;

const getFilter = (key, val) => `${key}=${encodeURIComponent(val)}`;
const getApiFilter = (key, val) => `filter[]=${`${key}:"${encodeURIComponent(val)}"`}`;

const filters = (daterange) => {
    daterange = daterange || [1900, '*'];
    return [
        'free_online_boolean:1',
        'datasource_str_mv:kavi',
        '~format_ext_str_mv:1/Video/Video/',
        '~format_ext_str_mv:1/Video/Short/',
        `search_daterange_mv:"[${daterange[0]} TO ${daterange[1]}]"`,
        '-id:kavi.elonet_elokuva_1611548',
        '-genre_facet:katsaus'

    ].map(f => `filter[]=${encodeURIComponent(f)}`).join('&');
};

const autocompleteUrl = (lookfor, limit) => {
  const fields = ['title','id','images','corporateAuthors','year'].map(f => `field[]=${f}`).join('&');
  return `${base}/api/v1/search?lookfor=${encodeURIComponent (lookfor)}&${filters()}&${fields}&limit=${limit}`;
};

const searchUrl = (lookfor, page = 1, topic, genre, daterange) => {
  const queryFilters = filters(daterange)
    + (topic ? `&filter[]=topic_facet:"${encodeURIComponent(topic)}"` : '')
    + (genre ? `&filter[]=genre_facet:"${encodeURIComponent(genre)}"` : '');

  const fields = ['title','id','images'].map(f => `field[]=${f}`).join('&');
  return `${base}/api/v1/search?lookfor=${encodeURIComponent (lookfor)}&${queryFilters}&${fields}&limit=${limit}&page=${page}`;
};

const frontPageUrl = () => {
  const queryFilters = filters()
    + '&filter[]=first_indexed:"[NOW-1YEAR/DAY TO *]';
  const fields = ['title','id','images', 'urls', 'recordPage', 'corporateAuthors', 'nonPresenterAuthors', 'year'].map(f => `field[]=${f}`).join('&');
  return `${base}/api/v1/search?${queryFilters}&${fields}&limit=10&sort=first_indexed desc,id asc}`;
};

const facetsUrl = (facet, topicFilter = null, genreFilter = null, daterange = null, lookfor = null) => {
  const queryFilters = filters(daterange)
    + (topicFilter ? `&${getApiFilter('topic_facet', topicFilter)}` : '')
    + (genreFilter ? `&${getApiFilter('genre_facet', genreFilter)}` : '');

  const facets = `facet[]=${facet}`;
  return `${base}/api/v1/search?lookfor=${lookfor ? encodeURIComponent(lookfor) : ''}&${queryFilters}&${facets}&limit=0`;
}
const topicFacetsUrl = (lookfor, topic, genre, daterange) => facetsUrl("topic_facet", topic, genre, daterange, lookfor);
const genreFacetsUrl = facetsUrl("genre_facet");
const yearFacetsUrl = facetsUrl("main_date_str");

const recordUrl = (id) => {
  const fields = ['title','id','images', 'urls', 'recordPage', 'imageRights', 'topics', 'buildings', 'nonPresenterAuthors', 'rawData'].map(f => `field[]=${f}`).join('&');
  return `${base}/api/v1/record?id=${id}&${fields}`;
};

export { searchUrl, recordUrl, autocompleteUrl, frontPageUrl, genreFacetsUrl, topicFacetsUrl, yearFacetsUrl, limit as searchLimit, getFilter };
