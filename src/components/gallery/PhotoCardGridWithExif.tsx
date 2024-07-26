import type { PhotoCreateWithoutPlaceInput } from '@/services/db/gallery';

import { PhotoCardWithExif } from './PhotoCardWithExif';

export function PhotoCardGridWithExif({
  countrySlug,
  areaSlug,
  photoDataWithExif,
}: {
  countrySlug: string;
  areaSlug: string;
  photoDataWithExif: PhotoCreateWithoutPlaceInput[];
}) {
  return photoDataWithExif.map(
    ({ id, url, thumbnailURL, blurDataURL, ...exif }, index) => (
      <div key={index} className="col-span-12 xl:col-span-4 md:col-span-6">
        {id && (
          <PhotoCardWithExif
            src={url}
            thumbnailURL={thumbnailURL}
            blurDataURL={blurDataURL}
            countrySlug={countrySlug}
            areaSlug={areaSlug}
            id={id}
            exif={exif}
          />
        )}
      </div>
    ),
  );
}
