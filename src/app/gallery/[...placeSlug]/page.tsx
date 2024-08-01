import { Suspense, cache } from 'react';

import { findPhotosForCountryCached } from '@/services/db/gallery';

import { PhotoModalPage } from '@/components/gallery';
import { PhotoModal } from '@/components/gallery/PhotoModal';

const findPhotosForCountryCachedCached = cache(findPhotosForCountryCached);

export default async function Page({
  searchParams,
  params: { placeSlug },
}: {
  searchParams: { [key: string]: string | undefined };
  params: { placeSlug: string[] };
}) {
  const { id } = searchParams;
  const [countrySlug] = placeSlug || [];

  const photoData = await findPhotosForCountryCachedCached(
    countrySlug.replace(/-/g, ' '),
  );
  if (!photoData) return <div>No photos found for this country.</div>;

  return (
    id && (
      <PhotoModal>
        <PhotoModalPage id={id} photoData={photoData} />
      </PhotoModal>
    )
  );
}
