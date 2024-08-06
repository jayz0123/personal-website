import { Suspense, cache } from 'react';

import { Metadata } from 'next';

import { findPhotosCached } from '@/services/db/gallery';

import { PhotoModalPage } from '@/components/gallery';
import { PhotoModal } from '@/components/gallery/PhotoModal';
import { NavProgress } from '@/components/ui';

const findPhotosCachedCached = cache(findPhotosCached);

export async function generateMetadata({
  params: { countrySlug },
  searchParams,
}: {
  params: {
    countrySlug: string;
  };
  searchParams: { area: string; photo: string };
}): Promise<Metadata | undefined> {
  const { area: areaQuerySlug, photo: photoQuerySlug } = searchParams;

  const photos = await findPhotosCachedCached();
  if (!photos) return;

  const photo = photos.find((photo) => {
    if (photoQuerySlug) {
      return photoQuerySlug === photo.slug;
    } else if (areaQuerySlug) {
      return areaQuerySlug === photo.areaSlug && photo.isCover;
    } else {
      return countrySlug === photo.countrySlug && photo.isCover;
    }
  });
  if (!photo) return;

  const title = photoQuerySlug
    ? photo.title
    : areaQuerySlug
      ? photo.placeArea + ' - ' + photo.placeCountry
      : photo.placeCountry;

  return {
    title: title,
    openGraph: {
      images: photo.thumbnailURL,
      publishedTime: photo.createdAt.toString(),
      modifiedTime: photo.updatedAt.toString(),
    },
  };
}

export default async function Page({
  searchParams,
}: {
  searchParams: { photo: string };
}) {
  const { photo: photoQuerySlug } = searchParams;
  const photos = await findPhotosCachedCached();
  if (!photos) return <div>No photos found</div>;

  const photo = photos.find((photo) => {
    return photoQuerySlug === photo.slug;
  });

  return (
    photoQuerySlug &&
    photo && (
      <Suspense fallback={<NavProgress />}>
        <PhotoModal>
          <PhotoModalPage photo={photo} />
        </PhotoModal>
      </Suspense>
    )
  );
}
