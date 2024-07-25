import { cache } from 'react';

import {
  findAreasForEveryCountryCached,
  findPhotosForCountryAreaCached,
} from '@/services/db/gallery';

import { PhotoCardWithExif } from '@/components/gallery';

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
  const photos = await findPhotosForCountryAreaCachedCached(
    country.replace(/-/g, ' '),
    area.replace(/-/g, ' '),
  );

  if (!photos) return null;

  return (
    <>
      {photos.map(({ id, url, thumbnailURL, blurDataURL, ...exif }, index) => (
        <PhotoCardWithExif
          key={index}
          src={url}
          thumbnailURL={thumbnailURL}
          blurDataURL={blurDataURL}
          country={country}
          area={area}
          id={id}
          exif={exif}
        />
      ))}
      {children}
      {modal}
    </>
  );
}
