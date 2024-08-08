import { cache } from 'react';

import { findPhotosCached } from '@/services/db/gallery';

import PhotoCardGridLayouts from '@/components/gallery/PhotoCardGridLayouts';

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

  return (
    <section aria-label="photo grid">
      <PhotoCardGridLayouts photos={photos} currentCountrySlug={countrySlug} />
      {children}
    </section>
  );
}
