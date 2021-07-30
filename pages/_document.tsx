import NextDocument, { Head, Html, Main, NextScript } from 'next/document';

import { clientBase } from '@/lib/api';

class MyDocument extends NextDocument {
  render(): JSX.Element {
    return (
      <Html lang="fi">
        <Head>
          <link rel="preconnect" href={clientBase} />
          <link rel="dns-prefetch" href={clientBase} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
