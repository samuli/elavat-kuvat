import { appTitle, appSubtitle, appUrl } from '@/lib/util';

export default {
  defaultTitle: appTitle,
  description: appSubtitle,
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
    site_name: 'Elävät kuvat',
  },
  twitter: {
    handle: '@handle',
    site: '@site',
    cardType: 'summary_large_image',
  },
};
