import Layout from '@/components/layout';
import { QueryClient, QueryClientProvider } from 'react-query';
import '../styles/globals.css'

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  const PageLayout = Component.layout || Layout;
  return (
    <QueryClientProvider client={queryClient}>
      <PageLayout>
        <Component {...pageProps} />
      </PageLayout>
    </QueryClientProvider>
  );
}

export default MyApp
