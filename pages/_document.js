import Document, { Html, Head, Main, NextScript } from 'next/document'
import { base } from '@/lib/api';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html lang="fi">
        <Head>
          <link rel="preconnect" href={base}/>
          <link rel="dns-prefetch" href={base}/>
          <meta name="description" content="Elävät kuvat - suomalaisia lyhytelokuvia"/>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
