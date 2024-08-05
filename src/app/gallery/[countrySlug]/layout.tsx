import { cache } from 'react';

import { ScrollShadow } from '@nextui-org/scroll-shadow';

import { findPhotosCached } from '@/services/db/gallery';

import { PhotoCardGrid } from '@/components/gallery';
import { Glowing } from '@/components/ui/';

type GenerateStaticParams = () => Promise<{ countrySlug: string }[]>;

export const dynamicParams = false;

export let generateStaticParams: GenerateStaticParams;

const findPhotosCachedCached = cache(findPhotosCached);

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
  if (!photos) return <div>No photos found</div>;

  const countryPhotos = photos.filter((photo) => {
    return countrySlug === photo.countrySlug;
  });

  return (
    <section className="flex flex-col items-center min-w-full grow">
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
    </section>
  );
}
