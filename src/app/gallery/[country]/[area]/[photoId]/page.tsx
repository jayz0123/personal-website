import Image from 'next/image';

import {
  findPhotoForIdCached,
  findPhotoIdsForCountryAreaCached,
} from '@/services/db/gallery';

type Params = {
  params: {
    country: string;
    area: string;
  };
};
type GenerateStaticParamsFunction = (
  arg0: Params,
) => Promise<{ photoId: string }[]>;

export const dynamicParams = false;
export let generateStaticParams: GenerateStaticParamsFunction | undefined =
  undefined;

const IS_PRODUCTION = process.env.NODE_ENV === 'production';
if (IS_PRODUCTION) {
  generateStaticParams = async ({ params: { country, area } }: Params) => {
    const photoIds = await findPhotoIdsForCountryAreaCached(country, area);
    if (!photoIds) return [];

    return photoIds.map(({ id }) => ({ photoId: id }));
  };
}

export default async function Photo({
  params: { photoId },
}: {
  params: { photoId: string };
}) {
  console.log('called Photo Pages');
  const photo = await findPhotoForIdCached(photoId);
  if (!photo) return null;

  return (
    <div>
      <h1>{photo?.title}</h1>
      <Image src={photo?.url} alt={photo?.title} width={1080} height={1080} />
    </div>
  );
}
