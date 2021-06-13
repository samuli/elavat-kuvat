import Link from 'next/link';
import Head from 'next/head';
import useSWR from 'swr';
import Fetcher from '@/lib/fetcher';
import { frontPageUrl, genreFacetsUrl, topicFacetsUrl } from '@/lib/api';
import { ResultGrid } from '@/components/ImageGrid';
import Facets from '@/components/Topics';

const FacetSection = ({ facet, title, facets }) => {

  return Object.entries(facets).map(([key, values]) => {
      return (
        <div key={`facet-${key}`}>
          <h2 className="text-2xl">{title}:</h2>
          <div className="my-3"><Facets facet={facet} facets={values} /></div>
        </div>
      );
  });
};

const FrontPage = () => {
  const { data } = useSWR(frontPageUrl('', 1, 3), Fetcher);
  const { data: topicFacets } = useSWR(topicFacetsUrl, Fetcher)
  const { data: genreFacets } = useSWR(genreFacetsUrl, Fetcher);

  const openRecord = (id) => {
    router.push(`/view?id=${encodeURIComponent(id)}`);
  };

  return (
    <div>
      <Head>
        <title>Elävät kuvat</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, minimum-scale=1.0"/>
      </Head>
      <div className="p-5">
        <div>
          { genreFacets?.status === 'OK' && <FacetSection title="Genre" facet="genre_facet" facets={genreFacets.facets} /> }
        </div>
        <div>
          { topicFacets?.status === 'OK' && <FacetSection title="Aiheet" facet="topic_facet" facets={topicFacets.facets} /> }
        </div>
        <div className="mt-5">
          <h2 className="text-2xl">Uusimmat:</h2>
          { data?.status === 'OK' && (
            <div>
              <ResultGrid records={data.records} onOpenRecord={openRecord} width="200" height="200"/>
              <div><Link href="/search"><a>Näytä kaikki ({data.resultCount})</a></Link></div>
            </div>
          ) }
        </div>
      </div>
    </div>
  );
};


export default FrontPage;
