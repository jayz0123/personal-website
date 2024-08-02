import { getExif } from '@/utils/imageHelpers';

import { PhotoDatus } from '@/services/db/gallery';

import { PhotoCard } from './PhotoCard';

// Define a type for the grid props
type PhotoCardGridProps = {
  slugs: string[];
  photos: PhotoDatus[];
};

export async function PhotoCardGrid({ slugs, photos }: PhotoCardGridProps) {
  const currentCountrySlug = slugs?.[0];
  const currentAreaSlug = slugs?.[1];

  const filteredPhotos = photos.filter(({ isCover, countrySlug, areaSlug }) => {
    if (currentAreaSlug) {
      return currentAreaSlug === areaSlug;
    } else if (currentCountrySlug) {
      return isCover && currentCountrySlug === countrySlug;
    }
  });

  return (
    <div className="min-w-full gap-4 grid grid-cols-12 p-4">
      {filteredPhotos.map((photo, index) => {
        const exif = currentAreaSlug ? getExif(photo) : undefined;

        return (
          <div
            key={index}
            className="col-span-12 md:col-span-6 xl:col-span-4 2xl:col-span-3"
          >
            <PhotoCard
              slugs={slugs}
              photoSlug={photo.slug}
              thumbnailURL={photo.thumbnailURL}
              blurDataURL={photo.blurDataURL}
              photoArea={photo.placeArea}
              photoAreaSlug={photo.areaSlug}
              orientation={photo.orientation}
              exif={exif}
            />
          </div>
        );
      })}
    </div>
  );
}
