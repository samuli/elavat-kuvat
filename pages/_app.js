import {ErrorBoundary} from 'react-error-boundary'
import { useRouter } from 'next/router'
import Layout from '@/components/layout';
import '../styles/globals.css'


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
      <PageLayout>
        <Component {...pageProps} />
      </PageLayout>
    </ErrorBoundary>
  );
}

export default MyApp
