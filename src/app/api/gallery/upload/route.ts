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

import { convertBase64ToBuffer } from '@/utils/fileHelpers';
import {
  extractExif,
  generateThumbnailURL,
  generateblurDataURL,
} from '@/utils/imageHelpers';

import { createPhoto } from '@/services/db/gallery';

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

    return NextResponse.json({ body: `Photos Uploaded` }, { status: 200 });
  } catch {
    return NextResponse.error();
  }
}
