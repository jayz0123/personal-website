import { cache } from 'react';

import { ScrollShadow } from '@nextui-org/scroll-shadow';

import {
  findPhotosForCountryCached,
  findPlacesCached,
} from '@/services/db/gallery';

import { PhotoCardGrid } from '@/components/gallery';
import Glowing from '@/components/ui/Glowing';

type GenerateStaticParams = () => Promise<{ placeSlug: string[] }[]>;

export const dynamicParams = false;

export let generateStaticParams: GenerateStaticParams;

const IS_PRODUCTION = process.env.NODE_ENV === 'production';
if (IS_PRODUCTION) {
  generateStaticParams = async () => {
    const places = await findPlacesCached();
    console.log(places);

    if (!places) return [];

    const placeSlugs = places.map(({ country, area }) => ({
      placeSlug: [country.replace(/ /g, '-'), area.replace(/ /g, '-')],
    }));

    return placeSlugs;
  };
}

const findPhotosForCountryCachedCached = cache(findPhotosForCountryCached);

export default async function Layout({
  children,
  params: { placeSlug },
}: {
  children: React.ReactNode;
  params: { placeSlug: string[] };
}) {
  console.log('place', placeSlug);
  const [countrySlug, areaSlug] = placeSlug || [];

  const photoData = await findPhotosForCountryCachedCached(
    countrySlug.replace(/-/g, ' '),
  );
  if (!photoData) return <div>No photos found for this country.</div>;

  return (
    <section className="flex flex-col items-center min-w-full grow">
      <Glowing variant="gallery" className="min-w-full">
        <ScrollShadow
          hideScrollBar
          size={10}
          className="min-w-full h-[65dvh] rounded-large"
        >
          <PhotoCardGrid
            variant={areaSlug ? 'exif' : 'area'}
            currentArea={areaSlug?.replace(/-/g, ' ')}
            photoData={photoData}
          />
        </ScrollShadow>
      </Glowing>
      {children}
    </section>
  );
}
