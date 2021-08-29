import { IRecord, IRecordUrl,IVideoUrl } from '@/lib/api';


export const recordUrl = (id: string): string => `/view?id=${encodeURIComponent(id)}`;

export const extractVideoUrls = (rec: IRecord): IVideoUrl[] => {
  if (typeof rec.urls === 'undefined') {
    return [];
  }
  const mimeType = 'application/x-mpegURL';
  const videoUrls: IVideoUrl[] = [];
  (rec.urls || []).forEach((url: IRecordUrl) => {
    (url.videoSources || []).forEach(videoUrl => {
      if (videoUrl.type === mimeType) {
        videoUrls.push({ ...videoUrl, title: url.text });
      }
    });
  });
  return videoUrls;
};

export const getField = (rec: IRecord, field: string): string | undefined => {
  if (rec.rawData) {
    return rec.rawData[field] as string || undefined;
  }
  return undefined;
}

export const finnaRecordPage = (id: string): string => `https://finna.fi${id}`;
