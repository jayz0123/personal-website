import { cache } from 'react';

import Image from 'next/image';

import {
  findPhotoForIdCached,
  findPhotoIdsForCountryAreaCached,
} from '@/services/db/gallery';

import { PhotoModal } from '@/components/gallery/PhotoModal';

type GenerateStaticParamsProps = {
  params: { country: string; area: string };
};

type GenerateStaticParams = (
  arg0: GenerateStaticParamsProps,
) => Promise<{ id: string }[]>;

export const dynamicParams = false;
export let generateStaticParams: GenerateStaticParams | undefined = undefined;

const IS_PRODUCTION = process.env.NODE_ENV === 'production';
if (IS_PRODUCTION) {
  generateStaticParams = async ({ params: { country, area } }) => {
    const ids = await findPhotoIdsForCountryAreaCached(country, area);

    return ids!;
  };
}

const findPhotoForIdCachedCached = cache(findPhotoForIdCached);

export default async function Photo({
  params: { id },
}: {
  params: { id: string };
}) {
  const photo = await findPhotoForIdCachedCached(id);

  if (!photo) return null;

  return (
    <PhotoModal id={id} orientation={photo.orientation!}>
      <Image
        src={photo.url}
        placeholder="blur"
        blurDataURL={photo.blurDataURL}
        alt={photo.title}
        loading="eager"
        priority
        width={
          photo.orientation === 'left-bottom'
            ? photo.height! / 3
            : photo.width! / 3
        }
        height={
          photo.orientation === 'left-bottom'
            ? photo.width! / 3
            : photo.height! / 3
        }
        sizes={`${photo.orientation === 'left-bottom' ? '60vh' : 'auto'}`}
        className={`z-0 object-contain rounded-lg ${photo.orientation === 'left-bottom' && 'max-h-min w-auto h-auto'}`}
      />
    </PhotoModal>
  );
}
