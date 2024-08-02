import ExifReader from 'exifreader';

import type { GalleryPhotoExif } from '@/lib/definitions';

import { PhotoDatus } from '@/services/db/gallery';

export function generateThumbnailURL(url: string) {
  return `${url}?format=auto&quality=75&width=640`;
}

export async function generateblurDataURL(url: string) {
  const response = await fetch(`${url}?format=auto&quality=75&width=10`);
  let type = response.headers.get('Content-Type');

  if (!type) type = 'image/svg+xml';

  const arrayBuffer = await response.arrayBuffer();
  const base64Data = Buffer.from(arrayBuffer).toString('base64');

  return `data:${type};base64,${base64Data}`;
}

const formattedDateTime = (dateTime: String | undefined) => {
  if (!dateTime) return undefined;

  const [date, time] = dateTime.split(' ');

  return new Date(`${date.replace(/:/g, '-')}T${time}`);
};

export function extractExif(file: Buffer): GalleryPhotoExif {
  const {
    FileType,
    Make,
    Model,
    Orientation,
    ['Image Height']: ImageHeight,
    ['Image Width']: ImageWidth,
    BrightnessValue,
    ExposureBiasValue,
    ExposureTime,
    ExposureMode,
    ExposureProgram,
    FNumber,
    FocalLength,
    FocalLengthIn35mmFilm,
    ISOSpeedRatings,
    LensMake,
    LensModel,
    DateTime,
    DateTimeOriginal,
  } = ExifReader.load(file);

  return {
    fileType: FileType?.description,
    make: Make?.description,
    model: Model?.description,
    orientation: Orientation?.description,
    height: ImageHeight?.value,
    width: ImageWidth?.value,
    brightness: BrightnessValue?.description,
    exposureBias: ExposureBiasValue?.description,
    exposureTime: ExposureTime?.description,
    exposureMode: ExposureMode?.description,
    exposureProgram: ExposureProgram?.description,
    fNumber: FNumber?.description,
    focalLength: FocalLength?.description,
    focalLengthIn35mmFilm: String(FocalLengthIn35mmFilm?.description),
    iso: String(ISOSpeedRatings?.description),
    lensMake: LensMake?.description,
    lensModel: LensModel?.description,
    dateTime: formattedDateTime(DateTime?.description),
    dateTimeOriginal: formattedDateTime(DateTimeOriginal?.description),
  };
}

export function getExif(photo: PhotoDatus): GalleryPhotoExif {
  const galleryPhotoExif: GalleryPhotoExif = {
    fileType: photo.fileType,
    make: photo.make,
    model: photo.model,
    orientation: photo.orientation,
    height: photo.height,
    width: photo.width,
    brightness: photo.brightness,
    exposureBias: photo.exposureBias,
    exposureTime: photo.exposureTime,
    exposureMode: photo.exposureMode,
    exposureProgram: photo.exposureProgram,
    fNumber: photo.fNumber,
    focalLength: photo.focalLength,
    focalLengthIn35mmFilm: photo.focalLengthIn35mmFilm,
    iso: photo.iso,
    lensMake: photo.lensMake,
    lensModel: photo.lensModel,
    dateTime: photo.dateTime,
    dateTimeOriginal: photo.dateTimeOriginal,
  };

  return galleryPhotoExif;
}
