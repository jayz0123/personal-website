import Image from 'next/image';

import { findPhotoForIdCached } from '@/services/db/gallery';

import { PhotoModal } from '@/components/gallery/PhotoModal';

export default async function Photo({
  params: { id },
}: {
  params: { id: string };
}) {
  const photo = await findPhotoForIdCached(id);

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
