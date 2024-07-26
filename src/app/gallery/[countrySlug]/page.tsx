import { cache } from 'react';

import {
  findAreaPhotoCoversForCountryCached,
  findCountriesCached,
} from '@/services/db/gallery';

import { PhotoCardGridWithArea } from '@/components/gallery';

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

const findAreaPhotoCoversForCountryCachedCached = cache(
  findAreaPhotoCoversForCountryCached,
);

export default async function CountryPage({
  params: { countrySlug },
}: {
  params: { countrySlug: string };
}) {
  const areaPhotoCovers = await findAreaPhotoCoversForCountryCachedCached(
    countrySlug.replace(/-/g, ' '),
  );

  if (!areaPhotoCovers) return null;

  return (
    <PhotoCardGridWithArea
      areaPhotoCovers={areaPhotoCovers}
      countrySlug={countrySlug}
    />
  );
}
