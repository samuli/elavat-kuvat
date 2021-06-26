import { RouterScrollProvider } from '@moxy/next-router-scroll';
import {ErrorBoundary} from 'react-error-boundary';
import { useRouter } from 'next/router';
import { AppWrapper } from '@/lib/state';
import Layout from '@/components/layout';
import '../styles/globals.css';


function ErrorFallback({error, resetErrorBoundary}) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  )
}

function MyApp({ Component, pageProps }) {
  const PageLayout = Component.layout || Layout;
  const router = useRouter();
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => {
        router.reload();
      }}
    >
      <AppWrapper>
        <RouterScrollProvider disableNextLinkScroll={false}>
          <PageLayout>
            <Component {...pageProps} />
          </PageLayout>
        </RouterScrollProvider>
      </AppWrapper>
    </ErrorBoundary>
  );
}

export default MyApp
