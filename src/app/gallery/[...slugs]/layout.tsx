import { cache } from 'react';

import { ScrollShadow } from '@nextui-org/scroll-shadow';

import { findPhotosCached } from '@/services/db/gallery';

import { PhotoCardGrid } from '@/components/gallery';
import Glowing from '@/components/ui/Glowing';

type GenerateStaticParams = () => Promise<{ slugs: string[] }[]>;

export const dynamicParams = false;

export let generateStaticParams: GenerateStaticParams;

const findPhotosCachedCached = cache(findPhotosCached);

const IS_PRODUCTION = process.env.NODE_ENV === 'production';
if (IS_PRODUCTION) {
  generateStaticParams = async () => {
    const photos = await findPhotosCachedCached();

    if (!photos) return [];

    return photos.map(({ countrySlug, areaSlug, slug }) => {
      return {
        slugs: [countrySlug, areaSlug, slug],
      };
    });
  };
}

export default async function Layout({
  children,
  params: { slugs },
}: {
  children: React.ReactNode;
  params: { slugs: string[] };
}) {
  const photos = await findPhotosCachedCached();
  if (!photos) return <div>No photos found</div>;

  return (
    <section className="flex flex-col items-center min-w-full grow">
      <Glowing variant="gallery" className="min-w-full">
        <ScrollShadow
          hideScrollBar
          size={10}
          className="min-w-full h-[65dvh] rounded-large"
        >
          <PhotoCardGrid slugs={slugs} photos={photos} />
        </ScrollShadow>
      </Glowing>
      {children}
    </section>
  );
}
