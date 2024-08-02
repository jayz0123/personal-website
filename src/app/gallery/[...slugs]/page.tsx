import { Metadata } from 'next';

import { findPhotosCached } from '@/services/db/gallery';

import { PhotoModalPage } from '@/components/gallery';
import { PhotoModal } from '@/components/gallery/PhotoModal';

export async function generateMetadata({
  params: { slugs },
}: {
  params: {
    slugs: string[];
  };
}): Promise<Metadata | undefined> {
  if (slugs.length === 0) return;

  const currentCountrySlug = slugs[0];
  const currentAreaSlug = slugs[1];
  const currentSlug = slugs[2];

  const photos = await findPhotosCached();
  if (!photos) return;

  const photo = photos.find(({ countrySlug, areaSlug, slug, isCover }) => {
    if (currentSlug) {
      return currentSlug === slug;
    } else if (currentAreaSlug) {
      return currentAreaSlug === areaSlug;
    } else {
      return currentCountrySlug === countrySlug && isCover;
    }
  });
  if (!photo) return;

  return {
    openGraph: {
      title: photo.title,
      images: photo.thumbnailURL,
      publishedTime: photo.createdAt.toString(),
      modifiedTime: photo.updatedAt.toString(),
    },
  };
}

export default async function Page({
  params: { slugs },
  searchParams,
}: {
  params: { slugs: string[] };
  searchParams: { [key: string]: string | undefined };
}) {
  if (slugs.length < 3) return null;

  const pathname = slugs.join('/');
  const { orientation } = searchParams;

  return (
    <PhotoModal>
      <PhotoModalPage pathname={pathname} orientation={orientation} />
    </PhotoModal>
  );
}
