import { Suspense } from 'react';

import { PhotoModalPage } from '@/components/gallery';

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
    <Suspense>
      <PhotoModalPage
        currentCountry={countrySlug.replace(/-/g, ' ')}
        currentArea={areaSlug.replace(/-/g, ' ')}
        id={id}
      />
    </Suspense>
  );
}