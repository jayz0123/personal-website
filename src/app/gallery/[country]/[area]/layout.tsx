import { cache } from 'react';

import {
  findAreasForEveryCountryCached,
  findPhotoThumbnailsForCountryAreaCached,
} from '@/services/db/gallery';

import { PhotoCard } from '@/components/gallery';

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

const findPhotoThumbnailsForCountryAreaCachedCached = cache(
  findPhotoThumbnailsForCountryAreaCached,
);

export default async function AreaLayout({
  params: { country, area },
}: {
  params: { country: string; area: string };
}) {
  const photoThumbnails = await findPhotoThumbnailsForCountryAreaCachedCached(
    country.replace(/-/g, ' '),
    area.replace(/-/g, ' '),
  );

  if (!photoThumbnails) return null;

  return photoThumbnails.map(({ id, thumbnailURL, blurDataURL }, index) => (
    <PhotoCard
      key={index}
      src={thumbnailURL}
      blurDataURL={blurDataURL}
      country={country}
      area={area}
      id={id}
      priority={index < 4 ? true : false}
    />
  ));
}
