import { cache } from 'react';

import { findPhotosForCountryCached } from '@/services/db/gallery';

import { PhotoCard } from './PhotoCard';

// Define a type for the grid props
type PhotoCardGridProps = {
  variant?: 'area' | 'exif'; // Determine which variant to render
  currentCountry: string;
  currentArea?: string;
};

const findPhotosForCountryCachedCached = cache(findPhotosForCountryCached);

export async function PhotoCardGrid({
  currentCountry,
  currentArea,
  variant = 'area',
}: PhotoCardGridProps) {
  const photoData = await findPhotosForCountryCachedCached(
    currentCountry.replace(/-/g, ' '),
  );

  if (!photoData) return <div>No photos found for this country.</div>;

  const filteredPhotos = photoData.filter(({ isCover, placeArea }) => {
    if (variant === 'exif') {
      return currentArea === placeArea;
    } else {
      return isCover;
    }
  });

  return filteredPhotos.map((photo, index) => {
    const { thumbnailURL, blurDataURL, placeCountry, placeArea, id, ...exif } =
      photo;

    return (
      <div key={index} className="col-span-12 xl:col-span-4 md:col-span-6">
        <PhotoCard
          variant={variant}
          url={thumbnailURL}
          blurDataURL={blurDataURL}
          countrySlug={placeCountry.replace(/ /g, '-')}
          areaSlug={placeArea.replace(/ /g, '-')}
          id={variant === 'exif' ? id : undefined}
          exif={variant === 'exif' ? exif : undefined}
        />
      </div>
    );
  });
}
