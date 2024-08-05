import { findPhotosCached } from '@/services/db/gallery';
import { findPostsCached } from '@/services/db/thoughts';

export type CustomFile = {
  fileName: string;
  fileType: string;
  content: string;
};

export type ThoughtsPostUploadForm = {
  title: string;
  subtitle: string;
  categories: { name: string }[];
  coverImage: CustomFile;
  post: CustomFile;
  published: boolean;
};

export type ThoughtsPost = Exclude<
  Awaited<ReturnType<typeof findPostsCached>>,
  undefined
>[0];

export type GalleryPhotoUploadForm = {
  title: string;
  country: string;
  area: string;
  photos: CustomFile[];
  isCover: boolean;
};

export type GalleryPhoto = Exclude<
  Awaited<ReturnType<typeof findPhotosCached>>,
  undefined
>[0];

export type GalleryPhotoExif = Pick<
  GalleryPhoto,
  | 'fileType'
  | 'make'
  | 'model'
  | 'orientation'
  | 'height'
  | 'width'
  | 'brightness'
  | 'exposureBias'
  | 'exposureTime'
  | 'exposureMode'
  | 'exposureProgram'
  | 'fNumber'
  | 'focalLength'
  | 'focalLengthIn35mmFilm'
  | 'iso'
  | 'lensMake'
  | 'lensModel'
  | 'dateTime'
  | 'dateTimeOriginal'
>;

export type ContactEmailSendForm = {
  name?: string;
  email: string;
  message: string;
  attachments?: CustomFile[];
};
