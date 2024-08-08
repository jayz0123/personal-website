'use client';

import { useMemo } from 'react';

import { GalleryPhoto } from '@/lib/definitions';

import { useQueryString } from '@/utils/hooks';

import { PhotoCard } from './PhotoCard';

export function PhotoCardGrid({ photos }: { photos: GalleryPhoto[] }) {
  const getQueryString = useQueryString('get');
  const areaQuerySlug = getQueryString('area');

  const filteredPhotos = useMemo(() => {
    return photos.filter((photo) => {
      if (areaQuerySlug) {
        return photo.areaSlug === areaQuerySlug;
      } else {
        return photo.isCover;
      }
    });
  }, [photos, areaQuerySlug]);

  return (
    <div className="min-w-full gap-4 grid grid-cols-12 p-4">
      {filteredPhotos.map((photo, index) => {
        return (
          <div key={index} className="col-span-12 md:col-span-6 xl:col-span-4">
            <PhotoCard photo={photo} />
          </div>
        );
      })}
    </div>
  );
}
