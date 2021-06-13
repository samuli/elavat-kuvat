export const recordUrl = id => `/view?id=${encodeURIComponent(id)}`;

export const extractVideoUrls = (rec) => {
  if (typeof rec.urls === 'undefined') {
      return [];
  }
  const mimeType = 'application/x-mpegURL';
  const urls = rec.urls.filter(url =>
    typeof url.videoSources !== 'undefined'
    && url.videoSources.find(
        src => src.type === mimeType));

    return urls.map(url => {
        return {
            src: url.videoSources.find(src => src.type == mimeType).src,
            title: url.text
        };
    });
};

export const finnaRecordPage = id => `https://finna.fi${id}`;
