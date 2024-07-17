import { cache } from 'react';

import { Metadata } from 'next';

import { authCached } from '@/auth';

import { findAreaPhotoCoversForEveryCountryCached } from '@/services/db/gallery';

import { PhotoCardContainer, PhotoCardPreview } from '@/components/gallery';
import { PhotoUpload } from '@/components/gallery/admin/PhotoUpload';

export const metadata: Metadata = {
  title: 'Gallery',
};

const findAreaPhotoCoversForEveryCountryCachedCached = cache(
  findAreaPhotoCoversForEveryCountryCached,
);

export default async function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await authCached();
  const areaPhotoCovers =
    await findAreaPhotoCoversForEveryCountryCachedCached();

  return (
    <section className="flex flex-col gap-y-16 items-center min-w-full">
      <PhotoCardContainer areaPhotoCovers={areaPhotoCovers!}>
        {children}
      </PhotoCardContainer>

      {session?.user.role === 'admin' && <PhotoUpload />}
    </section>
  );
}
