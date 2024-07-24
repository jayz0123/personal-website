import { cache } from 'react';

import Image from 'next/image';

import { findPhotoForIdCached } from '@/services/db/gallery';

import { PhotoModal } from '@/components/gallery';

const findPhotoForIdCachedCached = cache(findPhotoForIdCached);

export default async function Photo({
  params: { id },
}: {
  params: { id: string };
}) {
  const photo = await findPhotoForIdCachedCached(id);

  if (!photo) return null;

  const isPortrait = photo.orientation === 'left-bottom';

  const sizes = isPortrait ? '90vh auto' : '90vw auto';

  // Dynamic Size & Classnames for Different Orientations
  const containerClassNames = `flex justify-center items-center`;

  const imageClassNames = `object-contain rounded-lg ${
    isPortrait
      ? 'h-auto max-h-[90vh] w-full'
      : 'w-auto max-w-[90vw] max-h-[90vh] h-full'
  }`;

  return (
    <PhotoModal id={id}>
      <div className={containerClassNames}>
        <Image
          src={photo.url}
          placeholder="blur"
          blurDataURL={photo.blurDataURL}
          alt={photo.title}
          loading="eager"
          priority
          width={isPortrait ? photo.height! / 3 : photo.width! / 3}
          height={isPortrait ? photo.width! / 3 : photo.height! / 3}
          sizes={sizes}
          className={imageClassNames}
        />
      </div>
    </PhotoModal>
  );
}
