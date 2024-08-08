import { cache } from 'react';

import { Metadata } from 'next';

import { authCached } from '@/auth';

import { findPhotosCached } from '@/services/db/gallery';

import RevalidateButton from '@/components/admin/RevalidateButton';
import { CountryTabs } from '@/components/gallery';
import { PhotoUploadForm } from '@/components/gallery/admin/PhotoUploadForm';

export const metadata: Metadata = {
  title: {
    template: '%s | Gallery',
    default: 'Gallery',
  },
};

const findPhotosCachedCached = cache(findPhotosCached);

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await authCached();
  const photos = await findPhotosCachedCached();

  const hasNotPhotos = !photos || photos.length === 0;

  const countries = photos?.map(({ countrySlug }) => countrySlug);
  const uniqueCountrySlugs = [...new Set(countries)];

  return (
    <section
      aria-label="gallery"
      className="lg:max-w-[calc(130ch+4rem)] m-auto"
    >
      {!hasNotPhotos && (
        <CountryTabs
          countries={uniqueCountrySlugs.map((uniqueCountrySlug) => ({
            id: uniqueCountrySlug,
            label: uniqueCountrySlug.replace(/-/g, ' '),
            href: `/gallery/${uniqueCountrySlug}`,
          }))}
        >
          {children}
        </CountryTabs>
      )}
      {session?.user?.role === 'admin' && (
        <div className="flex flex-col mt-16 gap-y-4">
          <RevalidateButton tag="photos">Revalidate Photos</RevalidateButton>
          <PhotoUploadForm />
        </div>
      )}
    </section>
  );
}
