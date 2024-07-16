import { AWS_CLOUDFRONT_BASE_URL } from './awsCloudfront';
import { awsS3List, awsS3Put } from './awsS3';

export const THOUGHTS_REMOTE_PREFIX = 'thoughts';
export const PROJECTS_REMOTE_PREFIX = 'projects';
export const GALLERY_REMOTE_PREFIX = 'gallery';

export const generateRemoteDirForPrefix = (prefix: string, ...args: string[]) =>
  `${prefix}/${args.join('/')}`;

export const getURLsForRemoteDir = (remoteDir: string) =>
  `${AWS_CLOUDFRONT_BASE_URL}/${remoteDir}`;

export const uploadToRemote = async (
  fileBuffer: Buffer,
  remoteDir: string,
  fileType: string,
) => {
  await awsS3Put(remoteDir, fileBuffer, fileType);

  return getURLsForRemoteDir(remoteDir);
};

const getURLsForPrefix = async (prefix: string) => {
  const storageFilePaths = await awsS3List(prefix);

  return storageFilePaths.map(
    (storageFilePath) => `${AWS_CLOUDFRONT_BASE_URL}/${storageFilePath}`,
  );
};

export async function getGalleryResizedURLs({
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
  const originalURLs = await getURLsForPrefix(GALLERY_REMOTE_PREFIX);

  if (!format) return originalURLs;

  return originalURLs.map((originalURL) => {
    let resizedURL = originalURL + `?format=${format}`;

    resizedURL += quality ? `&quality=${quality}` : null;
    resizedURL += width ? `&width=${width}` : null;
    resizedURL += height ? `&height=${height}` : null;

    return resizedURL;
  });
}
