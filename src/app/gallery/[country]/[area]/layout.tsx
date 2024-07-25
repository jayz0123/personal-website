import { cache } from 'react';

import {
  findAreasForEveryCountryCached,
  findPhotosForCountryAreaCached,
} from '@/services/db/gallery';

export const dynamicParams = false;
export let generateStaticParams:
  | (() => Promise<{ country: string; area: string }[]>)
  | undefined = undefined;

const IS_PRODUCTION = process.env.NODE_ENV === 'production';
if (IS_PRODUCTION) {
  generateStaticParams = async () => {
    const countries = await findAreasForEveryCountryCached();

    return Object.entries(countries!)
      .map(([country, areas]) =>
        areas.map((area) => ({
          country: country.replace(/ /g, '-'),
          area: area.replace(/ /g, '-'),
        })),
      )
      .flat();
  };
}

const findPhotosForCountryAreaCachedCached = cache(
  findPhotosForCountryAreaCached,
);

export default async function AreaLayout({
  children,
  modal,
  params: { country, area },
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
  params: { country: string; area: string };
}) {
  const photos = await findPhotosForCountryAreaCachedCached(country, area);

  if (!photos) return null;

  return (
    <>
      {children}
      {modal}
    </>
  );
}
