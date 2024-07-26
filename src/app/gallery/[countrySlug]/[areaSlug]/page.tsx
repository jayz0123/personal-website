import { Suspense } from 'react';

import { PhotoCardGrid } from '@/components/gallery';

export default async function AreaPage({
  params: { countrySlug, areaSlug },
}: {
  params: { countrySlug: string; areaSlug: string };
}) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PhotoCardGrid
        variant="exif"
        currentCountry={countrySlug.replace(/-/g, ' ')}
        currentArea={areaSlug.replace(/-/g, ' ')}
      />
    </Suspense>
  );
}
