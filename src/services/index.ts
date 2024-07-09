import { AWS_CLOUDFRONT_BASE_URL } from './aws-cloudfront';
import { awsS3List, awsS3Put } from './aws-s3';

const THOUGHTS_PREFIX = 'thoughts/';
const PROJECTS_PREFIX = 'projects/';
const GALLERY_PREFIX = 'gallery/';

export const putFileInGallery = async (
  file: Buffer,
  fileName: string,
  country: string,
  area: string,
) => {
  const key = `${GALLERY_PREFIX}${country}/${area}/${fileName}`;

  await awsS3Put(key, file);
};

const getCdnUrlsForPrefix = async (prefix: string) => {
  const storageFilePaths = await awsS3List(prefix);

  return storageFilePaths.map(
    (storageFilePath) => `${AWS_CLOUDFRONT_BASE_URL}/${storageFilePath}`,
  );
};

export async function getGalleryResizedCdnUrls({
  format = 'auto',
  quality = 75,
  width,
  height,
}: {
  format?: 'auto' | 'jpeg' | 'webp' | 'avif';
  quality?: Number;
  width?: Number;
  height?: Number;
} = {}) {
  const originalUrls = await getCdnUrlsForPrefix(GALLERY_PREFIX);

  if (!format) return originalUrls;

  return originalUrls.map((originalUrl) => {
    let resizedUrl = originalUrl + `?format=${format}`;

    resizedUrl += quality ? `&quality=${quality}` : null;
    resizedUrl += width ? `&width=${width}` : null;
    resizedUrl += height ? `&height=${height}` : null;

    return resizedUrl;
  });
}
