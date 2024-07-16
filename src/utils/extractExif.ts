import ExifReader from 'exifreader';

import type { IGalleryPhotoExif } from '@/lib/definitions';

const formattedDateTime = (dateTime: String | undefined) => {
  if (!dateTime) return undefined;

  const [date, time] = dateTime.split(' ');

  return new Date(`${date.replace(/:/g, '-')}T${time}`);
};

export default function extractExif(file: Buffer): IGalleryPhotoExif {
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
