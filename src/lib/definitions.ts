export interface IContactForm {
  name?: string;
  email: string;
  message: string;
  attachments?: { fileName: string; content: string }[];
}

export interface IGalleryPhotoUpload {
  title?: string;
  country: string;
  area: string;
  photos: {
    fileName: string;
    fileType: string;
    content: string;
  }[];
}

export interface IGalleryPhotoExif {
  fileType?: string;
  make?: string;
  model?: string;
  orientation?: string;
  height?: number;
  width?: number;
  brightness?: string;
  exposureBias?: string;
  exposureTime?: string;
  exposureMode?: string;
  exposureProgram?: string;
  fNumber?: string;
  focalLength?: string;
  focalLengthIn35mmFilm?: string;
  iso?: string;
  lensMake?: string;
  lensModel?: string;
  dateTime?: Date;
  dateTimeOriginal?: Date;
}
