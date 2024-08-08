import Image from 'next/image';

import { GalleryPhoto } from '@/lib/definitions';

export function PhotoModalContent({ photo }: { photo: GalleryPhoto }) {
  const isPortrait = photo.orientation === 'left-bottom';
  const sizes = isPortrait ? '90vh auto' : '90vw auto';

  // Dynamic Size & Classnames for Different Orientations
  const containerClassNames = `flex justify-center items-center`;

  // Tailwind CSS class names without dynamic parts
  const imageClassNames = `object-contain rounded-lg ${
    isPortrait
      ? 'h-auto max-h-[90vh] w-full'
      : 'w-auto max-w-[90vw] max-h-[90vh] h-full'
  }`;

  return (
    <div className={containerClassNames}>
      <Image
        unoptimized
        src={photo.url}
        alt={photo.title || 'untitled'}
        placeholder="blur"
        blurDataURL={photo.blurDataURL}
        loading="eager"
        priority
        width={isPortrait ? 480 : 640}
        height={isPortrait ? 640 : 480}
        sizes={sizes}
        className={imageClassNames}
      />
    </div>
  );
}
