const base = 'http://localhost:3001';
//const base = 'https://api.finna.fi';

const limit = 50;

const getFilter = (key, val) => `${key}=${encodeURIComponent(val)}`;
const getApiFilter = (key, val) => `filter[]=${`${key}:"${encodeURIComponent(val)}"`}`;

const filters = (daterange = null) => {
    //daterange = daterange || [1900, '*'];
    const filters = [
        'free_online_boolean:1',
        'datasource_str_mv:kavi',
        '~format_ext_str_mv:1/Video/Video/',
        '~format_ext_str_mv:1/Video/Short/',
        //`search_daterange_mv:"[${daterange[0]} TO ${daterange[1]}]"`,
        '-id:kavi.elonet_elokuva_1611548',
        '-genre_facet:katsaus'
    ];
    if (typeof daterange !== 'undefined' && daterange === false) {
        daterange = daterange || [1900, '*'];
        filters.push(`search_daterange_mv:"[${daterange[0]} TO ${daterange[1]}]"`);
    }
    return filters.map(f => `filter[]=${encodeURIComponent(f)}`).join('&');
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
  const randomSet = randomSets[Math.floor(Math.random()*randomSets.length)];
    console.log(randomSet);
  const queryFilters = filters()
    + '&' + getApiFilter(randomSet[0], randomSet[1]);
//    + '&filter[]=first_indexed:"[NOW-1YEAR/DAY TO *]';
  const fields = ['title','id','images'].map(f => `field[]=${f}`).join('&');
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
