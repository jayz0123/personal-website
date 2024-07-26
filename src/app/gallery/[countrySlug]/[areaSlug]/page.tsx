import { cache } from 'react';

import {
  findAreasForCountryCached,
  findPhotosForCountryAreaCached,
} from '@/services/db/gallery';

import { PhotoCardGridWithExif } from '@/components/gallery';

type GenerateStaticParamsProps = {
  params: { countrySlug: string };
};

type GenerateStaticParams = (
  arg0: GenerateStaticParamsProps,
) => Promise<{ areaSlug: string }[]>;

export const dynamicParams = false;

export let generateStaticParams: GenerateStaticParams | undefined = undefined;

const IS_PRODUCTION = process.env.NODE_ENV === 'production';
if (IS_PRODUCTION) {
  generateStaticParams = async ({ params: { countrySlug } }) => {
    const areas = await findAreasForCountryCached(countrySlug);

    if (!areas) return [];

    return areas;
  };
}

const findPhotosForCountryAreaCachedCached = cache(
  findPhotosForCountryAreaCached,
);

export default async function AreaPage({
  params: { countrySlug, areaSlug },
}: {
  params: { countrySlug: string; areaSlug: string };
}) {
  const photoDataWithExif = await findPhotosForCountryAreaCachedCached(
    countrySlug.replace(/-/g, ' '),
    areaSlug.replace(/-/g, ' '),
  );

  if (!photoDataWithExif) return null;

  return (
    <PhotoCardGridWithExif
      countrySlug={countrySlug}
      areaSlug={areaSlug}
      photoDataWithExif={photoDataWithExif}
    />
  );
}
