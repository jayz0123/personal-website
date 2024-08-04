import { Photo } from '@/services/db/gallery';

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

export type GalleryPhotoUploadForm = {
  title: string;
  country: string;
  area: string;
  photos: CustomFile[];
  isCover: boolean;
};

export type GalleryPhotoExif = Pick<
  Photo,
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
