import { appUrl } from '@/lib/util';

export default {
  additionalLinkTags: [
    {
      rel: 'icon',
      href: `${appUrl}/favicon.ico`,
    }
  ],
  additionalMetaTags: [
    {
      property: 'keywords',
      content: 'suoratoisto, lyhytelokuva, mainos, dokumentti, video, elokuva, tv, animaatio, fiktio, tietoisku'
    },
  ],
  openGraph: {
    type: 'website',
    locale: 'fi_FI',
    url: appUrl,
    site_name: 'Elävät kuvat',
  },
  twitter: {
    handle: '@handle',
    site: '@site',
    cardType: 'summary_large_image',
  },
};
