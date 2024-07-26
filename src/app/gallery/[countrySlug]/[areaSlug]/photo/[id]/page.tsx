import { Suspense } from 'react';

import { findPhotoIdsForCountryAreaCached } from '@/services/db/gallery';

import { PhotoModalPage } from '@/components/gallery';

type GenerateStaticParamsProps = {
  params: { countrySlug: string; areaSlug: string };
};

type GenerateStaticParams = (
  arg0: GenerateStaticParamsProps,
) => Promise<{ id: string }[]>;

export const dynamicParams = false;

export let generateStaticParams: GenerateStaticParams | undefined = undefined;

const IS_PRODUCTION = process.env.NODE_ENV === 'production';
if (IS_PRODUCTION) {
  generateStaticParams = async ({ params: { countrySlug, areaSlug } }) => {
    const ids = await findPhotoIdsForCountryAreaCached(
      countrySlug.replace(/-/g, ' '),
      areaSlug.replace(/-/g, ' '),
    );

    if (!ids) return [];

    return ids;
  };
}

export default async function Photo({
  params: { countrySlug, areaSlug, id },
}: {
  params: {
    countrySlug: string;
    areaSlug: string;
    id: string;
  };
}) {
  return (
    <Suspense>
      <PhotoModalPage
        currentCountry={countrySlug.replace(/-/g, ' ')}
        currentArea={areaSlug.replace(/-/g, ' ')}
        id={id}
      />
    </Suspense>
  );
}
