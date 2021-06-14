import Layout from '@/components/layout';
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  const PageLayout = Component.layout || Layout;
  return (
    <PageLayout>
      <Component {...pageProps} />
    </PageLayout>
  );
}

export default MyApp
