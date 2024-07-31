import { PhotoCard } from './PhotoCard';

// Define a type for the grid props
type PhotoCardGridProps = {
  variant?: 'area' | 'exif'; // Determine which variant to render
  currentArea?: string;
  photoData: any[];
};

export async function PhotoCardGrid({
  variant = 'area',
  currentArea,
  photoData,
}: PhotoCardGridProps) {
  const filteredPhotos = photoData.filter(({ isCover, placeArea }) => {
    if (variant === 'exif') {
      return currentArea === placeArea;
    } else {
      return isCover;
    }
  });

  return (
    <div className="min-w-full gap-4 grid grid-cols-12 p-4">
      {filteredPhotos.map((photo, index) => {
        const {
          thumbnailURL,
          blurDataURL,
          placeCountry,
          placeArea,
          id,
          ...exif
        } = photo;

        return (
          <div
            key={index}
            className="col-span-12 md:col-span-6 xl:col-span-4 2xl:col-span-3"
          >
            <PhotoCard
              variant={variant}
              url={thumbnailURL}
              blurDataURL={blurDataURL}
              areaSlug={placeArea.replace(/ /g, '-')}
              id={variant === 'exif' ? id : undefined}
              exif={variant === 'exif' ? exif : undefined}
            />
          </div>
        );
      })}
    </div>
  );
}
