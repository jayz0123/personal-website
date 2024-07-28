import { cache } from 'react';

import { Metadata } from 'next';

import { authCached } from '@/auth';

import { findCountriesCached } from '@/services/db/gallery';

import { CountryTabs } from '@/components/gallery';
import { PhotoUpload } from '@/components/gallery/admin/PhotoUpload';

export const metadata: Metadata = {
  title: 'Gallery',
};

const authCachedCached = cache(authCached);
const findCountriesCachedCached = cache(findCountriesCached);

export default async function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await authCachedCached();
  const countries = await findCountriesCachedCached();

  if (!countries) return <div>No countries found</div>;

  return (
    <section className="flex flex-col items-center min-w-full">
      <CountryTabs
        countries={countries.map(({ countrySlug }) => ({
          id: countrySlug,
          label: countrySlug.replace(/-/g, ' '),
          href: `/gallery/${countrySlug}`,
        }))}
      >
        {children}
      </CountryTabs>

      {session?.user?.role === 'admin' && <PhotoUpload />}
    </section>
  );
}
