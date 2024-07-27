import { Suspense } from 'react';

import { PhotoModalPage } from '@/components/gallery';
import { PhotoModal } from '@/components/gallery/PhotoModal';

export default async function Photo({
  params: { countrySlug, areaSlug, id },
}: {
  params: {
    countrySlug: string;
    areaSlug: string;
    id: string;
  };
}) {
  return (
    <PhotoModal>
      <PhotoModalPage
        currentCountry={countrySlug.replace(/-/g, ' ')}
        currentArea={areaSlug.replace(/-/g, ' ')}
        id={id}
      />
    </PhotoModal>
  );
}
