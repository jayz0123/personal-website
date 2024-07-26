import { cache } from 'react';

import {
  findCountriesCached,
  findPhotosForCountryCached,
} from '@/services/db/gallery';

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

const findPhotosForCountryCachedCached = cache(findPhotosForCountryCached);

export default async function CountryPage({
  params: { countrySlug },
}: {
  params: { countrySlug: string };
}) {
  const photoData = await findPhotosForCountryCachedCached(
    countrySlug.replace(/-/g, ' '),
  );

  if (!photoData) return null;

  return <PhotoCardGrid photoData={photoData} />;
}
