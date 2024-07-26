import { cache } from 'react';

import {
  findAreasForCountryCached,
  findPhotosForCountryAreaCached,
  findPhotosForCountryCached,
} from '@/services/db/gallery';

import { PhotoCardGrid } from '@/components/gallery';

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

const findPhotosForCountryCachedCached = cache(findPhotosForCountryCached);

export default async function AreaPage({
  params: { countrySlug, areaSlug },
}: {
  params: { countrySlug: string; areaSlug: string };
}) {
  const photoData = await findPhotosForCountryCachedCached(
    countrySlug.replace(/-/g, ' '),
  );

  if (!photoData) return null;

  return (
    <PhotoCardGrid
      variant="exif"
      currentArea={areaSlug.replace(/-/g, ' ')}
      photoData={photoData}
    />
  );
}
