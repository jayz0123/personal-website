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
    <Suspense fallback={<div>Loading...</div>}>
      <PhotoModalPage
        currentCountry={countrySlug}
        currentArea={areaSlug}
        id={id}
      />
    </Suspense>
  );
}
