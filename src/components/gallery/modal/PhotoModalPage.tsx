import { memo, useMemo } from 'react';

import { GalleryPhoto } from '@/lib/definitions';

import { PhotoModal } from './PhotoModal';
import { PhotoModalContent } from './PhotoModalContent';

const PhotoModalPage = memo(function PhotoModalPage({
  photos,
  currentPhotoQuerySlug,
}: {
  photos: GalleryPhoto[];
  currentPhotoQuerySlug: string;
}) {
  const photo = useMemo(() => {
    return photos.find((photo) => currentPhotoQuerySlug === photo.slug);
  }, [currentPhotoQuerySlug, photos]);

  if (!photo) return <h1>{`Photo ${currentPhotoQuerySlug} Not Exists`}</h1>;

  return (
    <PhotoModal>
      <PhotoModalContent photo={photo} />
    </PhotoModal>
  );
});

export default PhotoModalPage;
