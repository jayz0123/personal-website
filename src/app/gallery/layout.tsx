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

  if (!photos) return <div>No photos fonund</div>;

  const countries = photos.map(({ countrySlug }) => countrySlug);
  const uniqueCountrySlugs = [...new Set(countries)];

  return (
    <section className="flex flex-col items-center min-w-full grow">
      <CountryTabs
        countries={uniqueCountrySlugs.map((uniqueCountrySlug) => ({
          id: uniqueCountrySlug,
          label: uniqueCountrySlug.replace(/-/g, ' '),
          href: `/gallery/${uniqueCountrySlug}`,
        }))}
      >
        {children}
      </CountryTabs>
      {session?.user?.role === 'admin' && (
        <div className="flex flex-col mt-16 min-w-full gap-y-4">
          <RevalidateButton tag="photos">Revalidate Photos</RevalidateButton>
          <PhotoUploadForm />
        </div>
      )}
    </section>
  );
}
