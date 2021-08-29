import '../styles/globals.css';

import { RouterScrollProvider } from '@moxy/next-router-scroll';
import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { DefaultSeo } from 'next-seo';
import { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

import Layout from '@/components/layout';
import { trackPageView } from '@/lib/util';

import SEO from '../next-seo.config';

const defaultQueryFn = async ({ queryKey }) => {
  const res = await fetch(queryKey[0]);
  return res.json();
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      queryFn: defaultQueryFn,
    },
  },
});

function MyApp({ Component, pageProps }: AppProps): React.ReactNode {
  const router = useRouter();

  useEffect(() => {
    function onRouteChangeComplete(url: string) {
      trackPageView(url);
    }
    router.events.on('routeChangeComplete', onRouteChangeComplete);

    return () => {
      router.events.off('routeChangeComplete', onRouteChangeComplete);
    };
  }, [router]);

  return (
    <RouterScrollProvider disableNextLinkScroll={false}>
      <QueryClientProvider client={queryClient}>
        <Layout>
          <>
            <DefaultSeo {...SEO} />
            <Component {...pageProps} />
          </>
        </Layout>
      </QueryClientProvider>
    </RouterScrollProvider>
  );
}

export default MyApp;
