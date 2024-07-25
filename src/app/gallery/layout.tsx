import { cache } from 'react';

import { Metadata } from 'next';

import { authCached } from '@/auth';

import {
  findAreaPhotoCoversForEveryCountryCached,
  findCountriesCached,
} from '@/services/db/gallery';

import { CountryTabs, PhotoCardContainer } from '@/components/gallery';
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
  // const areaPhotoCovers =
  //   await findAreaPhotoCoversForEveryCountryCachedCached();
  const countries = await findCountriesCached();
  if (!countries) return null;

  return (
    <section className="flex flex-col gap-y-16 items-center min-w-full">
      {/* <PhotoCardContainer areaPhotoCovers={areaPhotoCovers!}>
        {children}
      </PhotoCardContainer> */}
      <CountryTabs
        countries={countries.map((country) => ({
          id: country.replace(/ /g, '-'),
          label: country,
          href: `/gallery/${country.replace(/ /g, '-')}`,
        }))}
      >
        {children}
      </CountryTabs>

      {session?.user?.role === 'admin' && <PhotoUpload />}
    </section>
  );
}
