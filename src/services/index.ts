import {
  AWS_CLOUDFRONT_RESIZER_URL,
  AWS_CLOUDFRONT_S3_URL,
} from './awsCloudfront';
import { awsS3Put } from './awsS3';

export const THOUGHTS_REMOTE_PREFIX = 'thoughts';
export const PROJECTS_REMOTE_PREFIX = 'projects';
export const GALLERY_REMOTE_PREFIX = 'gallery';

export const generateRemoteDirForPrefix = (prefix: string, ...args: string[]) =>
  `${prefix}/${args.join('/')}`;

export const getURLsForRemoteDir = (remoteDir: string) =>
  `${AWS_CLOUDFRONT_S3_URL}/${remoteDir}`;

export const getResizerURLsForRemoteDir = (remoteDir: string) =>
  `${AWS_CLOUDFRONT_RESIZER_URL}/${remoteDir}`;

export const uploadToRemote = async (
  fileBuffer: Buffer,
  remoteDir: string,
  fileType?: string,
) => {
  await awsS3Put(remoteDir, fileBuffer, fileType);

  return fileType?.includes('image')
    ? getResizerURLsForRemoteDir(remoteDir)
    : getURLsForRemoteDir(remoteDir);
};
