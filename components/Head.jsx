import Head from 'next/head';

const HeadTags = ({ title = null}) => (
  <Head>
    <title>{ title && `${title} : ` }Elävät kuvat</title>
    <link rel="icon" href="/favicon.ico" />
    <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, minimum-scale=1.0"/>
  </Head>
);

export default HeadTags;
