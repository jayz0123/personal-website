'use client';

import { useSearchParams } from 'next/navigation';

import { Photo } from '@/services/db/gallery';

import { PhotoCard } from './PhotoCard';

export async function PhotoCardGrid({
  countryPhotos,
}: {
  countryPhotos: Photo[];
}) {
  const searchParams = useSearchParams();
  const areaQuerySlug = searchParams.get('area');

  const filteredPhotos = countryPhotos.filter((photo) => {
    if (areaQuerySlug) {
      return photo.areaSlug === areaQuerySlug;
    } else {
      return photo.isCover;
    }
  });

  return (
    <div className="min-w-full gap-4 grid grid-cols-12 p-4">
      {filteredPhotos.map((photo, index) => {
        return (
          <div
            key={index}
            className="col-span-12 md:col-span-6 xl:col-span-4 2xl:col-span-3"
          >
            <PhotoCard photo={photo} />
          </div>
        );
      })}
    </div>
  );
}
