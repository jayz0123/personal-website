import {
  findAreasForEveryCountryCached,
  findPhotosForCountryAreaCached,
} from '@/services/db/gallery';

import { PhotoCard, PhotoCardContainer } from '@/components/gallery';

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
          country: country.replace(' ', '-'),
          area: area.replace(' ', '-'),
        })),
      )
      .flat();
  };
}

export default async function Area({
  params: { country, area },
}: {
  params: { country: string; area: string };
}) {
  const photos = await findPhotosForCountryAreaCached(
    country.replace('-', ' '),
    area.replace('-', ' '),
  );
  if (!photos) return null;

  return (
    <PhotoCardContainer
      breadcrumbs={[country.replace('-', ' '), area.replace('-', ' ')]}
    >
      {photos.map(({ thumbnailURL, blurDataURL }, index) => (
        <PhotoCard
          key={index}
          src={thumbnailURL}
          blurDataURL={blurDataURL}
          priority={index < 4 ? true : false}
        />
      ))}
    </PhotoCardContainer>
  );
}
