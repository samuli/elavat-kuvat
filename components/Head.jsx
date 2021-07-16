import Head from 'next/head';

const HeadTags = ({ title = null, description = null, resultPage = null}) => (
  <Head>
    <title>{ title && `${title} / ` }Elävät kuvat{ !title ? ' - suomalaisia lyhytelokuvia' : '' }{resultPage > 1 ? ` - sivu ${resultPage}` : ''}</title>
    <link rel="icon" href="/favicon.ico" />
    <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, minimum-scale=1.0"/>
    { description && <meta name="description" content={description.substring(0,200)} /> }
  </Head>
);

export default HeadTags;
