import { NextRequest, NextResponse } from 'next/server';

import {
  GALLERY_REMOTE_PREFIX,
  generateRemoteDirForPrefix,
  uploadToRemote,
} from '@/services';

import type {
  GalleryPhotoExif,
  GalleryPhotoUploadForm,
} from '@/lib/definitions';

import convertBase64ToBuffer from '@/utils/convertBase64ToBuffer';
import extractExif from '@/utils/extractExif';

import { createPhoto } from '@/services/db/gallery';

const generateblurDataURL = async (url: string) => {
  const response = await fetch(`${url}?format=auto&quality=75&width=10`);
  let type = response.headers.get('Content-Type');

  if (!type) type = 'image/svg+xml';

  const arrayBuffer = await response.arrayBuffer();
  const base64Data = Buffer.from(arrayBuffer).toString('base64');

  return `data:${type};base64,${base64Data}`;
};

const generateThumbnailURL = (url: string) => {
  return `${url}?format=auto&quality=75&width=640`;
};

export async function POST(request: NextRequest) {
  try {
    const { title, country, area, photos } =
      (await request.json()) as GalleryPhotoUploadForm;

    for (const photo of photos) {
      const photoBuffer = convertBase64ToBuffer(photo.content);
      const exif: GalleryPhotoExif = extractExif(photoBuffer);

      const remoteDir = generateRemoteDirForPrefix(
        GALLERY_REMOTE_PREFIX,
        country.replace(/ /g, '-'),
        area.replace(/ /g, '-'),
        photo.fileName.replace(/ /g, '-'),
      );

      const url = await uploadToRemote(photoBuffer, remoteDir, photo.fileType);

      const thumbnailURL = generateThumbnailURL(url);
      const blurDataURL = await generateblurDataURL(url);

      await createPhoto({
        photoData: {
          title,
          url,
          thumbnailURL,
          blurDataURL,
          ...exif,
        },
        place: {
          country,
          area,
        },
      });
    }

    return NextResponse.json({ body: `Uploaded photos` }, { status: 200 });
  } catch {
    return NextResponse.error();
  }
}
