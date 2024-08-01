import { cache } from 'react';

import { Metadata } from 'next';

import { authCached } from '@/auth';

import { findCountriesCached } from '@/services/db/gallery';

import { CountryTabs } from '@/components/gallery';
import { PhotoUploadForm } from '@/components/gallery/admin/PhotoUploadForm';

export const metadata: Metadata = {
  title: 'Gallery',
};

const findCountriesCachedCached = cache(findCountriesCached);

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await authCached();
  const countries = await findCountriesCachedCached();

  if (!countries) return <div>No countries found</div>;

  return (
    <section className="flex flex-col items-center min-w-full grow">
      <CountryTabs
        countries={countries.map(({ countrySlug }) => ({
          id: countrySlug,
          label: countrySlug.replace(/-/g, ' '),
          href: `/gallery/${countrySlug}`,
        }))}
      >
        {children}
      </CountryTabs>
      {session?.user?.role === 'admin' && <PhotoUploadForm />}
    </section>
  );
}
