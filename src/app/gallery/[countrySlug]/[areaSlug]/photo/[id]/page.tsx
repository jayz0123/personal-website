import { Suspense } from 'react';

import { Metadata } from 'next';

import {
  findPhotoIdsForCountryAreaCached,
  findPhotosForCountryCached,
} from '@/services/db/gallery';

import { PhotoModalPage } from '@/components/gallery';
import { PhotoModal } from '@/components/gallery/PhotoModal';

type GenerateStaticParamsProps = {
  params: { countrySlug: string; areaSlug: string };
};

type GenerateStaticParams = (
  arg0: GenerateStaticParamsProps,
) => Promise<{ id: string }[]>;

// export const dynamicParams = false;

export let generateStaticParams: GenerateStaticParams | undefined = undefined;

const IS_PRODUCTION = process.env.NODE_ENV === 'production';
if (false) {
  generateStaticParams = async ({ params: { countrySlug, areaSlug } }) => {
    const ids = await findPhotoIdsForCountryAreaCached(
      countrySlug.replace(/-/g, ' '),
      areaSlug.replace(/-/g, ' '),
    );

    if (!ids) return [];

    return ids;
  };
}

export async function generateMetadata({
  params: { countrySlug, areaSlug, id },
}: {
  params: {
    countrySlug: string;
    areaSlug: string;
    id: string;
  };
}): Promise<Metadata | undefined> {
  const photoData = await findPhotosForCountryCached(
    countrySlug.replace(/-/g, ' '),
  );
  if (!photoData) return;

  const photo = photoData.find(({ id: photoId }) => photoId === id);
  if (!photo) return;

  return {
    openGraph: {
      title: photo.title,
      images: photo.thumbnailURL,
      publishedTime: photo.createdAt.toString(),
      modifiedTime: photo.updatedAt.toString(),
    },
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
    <PhotoModal>
      <PhotoModalPage
        currentCountry={countrySlug.replace(/-/g, ' ')}
        currentArea={areaSlug.replace(/-/g, ' ')}
        id={id}
      />
    </PhotoModal>
  );
}
