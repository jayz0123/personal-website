import { Suspense } from 'react';

import { PhotoCardGrid } from '@/components/gallery';

export default async function CountryPage({
  params: { countrySlug },
}: {
  params: { countrySlug: string };
}) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PhotoCardGrid currentCountry={countrySlug} />
    </Suspense>
  );
}
