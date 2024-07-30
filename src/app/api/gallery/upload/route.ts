import { NextRequest, NextResponse } from 'next/server';

import {
  GALLERY_REMOTE_PREFIX,
  generateRemoteDirForPrefix,
  uploadToRemote,
} from '@/services';

import type { GalleryPhotoExif, GalleryPhotoUpload } from '@/lib/definitions';

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
      (await request.json()) as GalleryPhotoUpload;

    for (const photo of photos) {
      const photoContentBuffer = Buffer.from(
        photo.content.split(',')[1],
        'base64',
      );
      const exif: GalleryPhotoExif = extractExif(photoContentBuffer);

      const remoteDir = generateRemoteDirForPrefix(
        GALLERY_REMOTE_PREFIX,
        country.replace(/ /g, '-'),
        area.replace(/ /g, '-'),
        photo.fileName.replace(/ /g, '-'),
      );

      const url = await uploadToRemote(
        photoContentBuffer,
        remoteDir,
        photo.fileType,
      );

      const thumbnailURL = generateThumbnailURL(url);
      const blurDataURL = await generateblurDataURL(url);

      const _ = await createPhoto({
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
