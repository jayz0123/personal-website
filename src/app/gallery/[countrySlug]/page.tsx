import { Suspense } from 'react';

import { findCountriesCached } from '@/services/db/gallery';

import { PhotoCardGrid } from '@/components/gallery';

export const dynamicParams = false;

export let generateStaticParams:
  | (() => Promise<{ countrySlug: string }[]>)
  | undefined = undefined;

const IS_PRODUCTION = process.env.NODE_ENV === 'production';
if (IS_PRODUCTION) {
  generateStaticParams = async () => {
    const countries = await findCountriesCached();

    if (!countries) return [];

    return countries;
  };
}

export default async function CountryPage({
  params: { countrySlug },
}: {
  params: { countrySlug: string };
}) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PhotoCardGrid currentCountry={countrySlug} />
    </Suspense>
  );
}
