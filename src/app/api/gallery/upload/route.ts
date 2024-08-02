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
    const { title, country, area, photos, isCover } =
      (await request.json()) as GalleryPhotoUploadForm;

    const photo = photos[0];

    const photoBuffer = convertBase64ToBuffer(photo.content);
    const exif: GalleryPhotoExif = extractExif(photoBuffer);

    const countrySlug = country.replace(/ /g, '-');
    const areaSlug = area.replace(/ /g, '-');
    const slug = title.replace(/ /g, '-').toLowerCase();

    const remoteDir = generateRemoteDirForPrefix(
      GALLERY_REMOTE_PREFIX,
      country.replace(/ /g, '-'),
      area.replace(/ /g, '-'),
      slug,
    );

    const url = await uploadToRemote(photoBuffer, remoteDir, photo.fileType);

    const thumbnailURL = generateThumbnailURL(url);
    const blurDataURL = await generateblurDataURL(url);

    const id = await createPhoto({
      photoData: {
        url,
        thumbnailURL,
        blurDataURL,
        countrySlug,
        areaSlug,
        slug,
        title,
        isCover,
        ...exif,
      },
      place: {
        country,
        area,
      },
    });

    return NextResponse.json(
      { body: `Photos Uploaded ${id}` },
      { status: 200 },
    );
  } catch {
    return NextResponse.error();
  }
}
