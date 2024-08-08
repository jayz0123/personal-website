import { memo, useMemo } from 'react';

import { ScrollShadow } from '@nextui-org/scroll-shadow';

import { GalleryPhoto } from '@/lib/definitions';

import { Glowing } from '../ui';
import { CountryTabs } from './CountryTabs';
import { PhotoCardGrid } from './PhotoCardGrid';

const PhotoCardGridLayouts = memo(function PhotoCardGridLayouts({
  photos,
  currentCountrySlug,
}: {
  photos: GalleryPhoto[];
  currentCountrySlug: string;
}) {
  const uniqueCountrySlugs = useMemo(() => {
    const countries = photos.map(({ countrySlug }) => countrySlug);
    return [...new Set(countries)];
  }, [photos]);

  const countryPhotos = useMemo(
    () => photos.filter((photo) => currentCountrySlug === photo.countrySlug),
    [currentCountrySlug, photos],
  );

  return (
    <CountryTabs
      countrySlugs={uniqueCountrySlugs}
      currentCountrySlug={currentCountrySlug}
    >
      <Glowing variant="container" className="min-w-full">
        <ScrollShadow
          hideScrollBar
          size={10}
          className="min-w-full h-[65dvh] rounded-large"
        >
          <PhotoCardGrid photos={countryPhotos} />
        </ScrollShadow>
      </Glowing>
    </CountryTabs>
  );
});

export default PhotoCardGridLayouts;
