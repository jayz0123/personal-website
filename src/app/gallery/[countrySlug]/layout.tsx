import { cache } from 'react';

import { ScrollShadow } from '@nextui-org/scroll-shadow';

import { findPhotosCached } from '@/services/db/gallery';

import { PhotoCardGrid } from '@/components/gallery';
import { Glowing } from '@/components/ui/';

const findPhotosCachedCached = cache(findPhotosCached);

type GenerateStaticParams = () => Promise<{ countrySlug: string }[]>;
export const dynamicParams = false;
export let generateStaticParams: GenerateStaticParams;
const IS_PRODUCTION = process.env.NODE_ENV === 'production';
if (IS_PRODUCTION) {
  generateStaticParams = async () => {
    const photos = await findPhotosCachedCached();

    if (!photos) return [];

    return photos.map(({ countrySlug }) => {
      return {
        countrySlug,
      };
    });
  };
}

export default async function Layout({
  children,
  params: { countrySlug },
}: {
  children: React.ReactNode;
  params: { countrySlug: string };
}) {
  const photos = await findPhotosCachedCached();
  if (!photos || photos.length === 0) return <h1>No Photos</h1>;

  const countryPhotos = photos.filter(
    (photo) => countrySlug === photo.countrySlug,
  );

  return (
    <div className="flex flex-col items-center">
      <Glowing variant="container" className="min-w-full">
        <ScrollShadow
          hideScrollBar
          size={10}
          className="min-w-full h-[65dvh] rounded-large"
        >
          <PhotoCardGrid countryPhotos={countryPhotos} />
        </ScrollShadow>
      </Glowing>
      {children}
    </div>
  );
}
