import { Suspense } from 'react';

import { findAreasForCountryCached } from '@/services/db/gallery';

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

export default async function AreaPage({
  params: { countrySlug, areaSlug },
}: {
  params: { countrySlug: string; areaSlug: string };
}) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PhotoCardGrid
        variant="exif"
        currentCountry={countrySlug.replace(/-/g, ' ')}
        currentArea={areaSlug.replace(/-/g, ' ')}
      />
    </Suspense>
  );
}
