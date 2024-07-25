import { cache } from 'react';

import {
  findAreaPhotoCoversForCountryCached,
  findCountriesCached,
} from '@/services/db/gallery';

import { PhotoCardContainer } from '@/components/gallery';

export const dynamicParams = false;
export let generateStaticParams:
  | (() => Promise<{ country: string }[]>)
  | undefined = undefined;

const IS_PRODUCTION = process.env.NODE_ENV === 'production';
if (IS_PRODUCTION) {
  generateStaticParams = async () => {
    const countries = await findCountriesCached();

    return countries!.map((country) => ({
      country: country.replace(/ /g, '-'),
    }));
  };
}

const findAreaPhotoCoversForCountryCachedCached = cache(
  findAreaPhotoCoversForCountryCached,
);

export default async function Page({
  params: { country },
}: {
  params: { country: string };
}) {
  const areaPhotoCovers =
    await findAreaPhotoCoversForCountryCachedCached(country);

  return (
    <PhotoCardContainer areaPhotoCovers={areaPhotoCovers!} country={country} />
  );
}
