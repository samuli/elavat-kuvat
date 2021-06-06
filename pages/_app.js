import Layout from './layout';
import { QueryClient, QueryClientProvider } from 'react-query';
import '../styles/globals.css'

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  console.log(Component);
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
