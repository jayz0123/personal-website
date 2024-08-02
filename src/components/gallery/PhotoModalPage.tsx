import Image from 'next/image';

import { AWS_CLOUDFRONT_RESIZER_URL } from '@/services/awsCloudfront';

export async function PhotoModalPage({
  pathname,
  orientation,
}: {
  pathname: string;
  orientation?: string;
}) {
  const isPortrait = orientation === 'left-bottom';
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
        src={`${AWS_CLOUDFRONT_RESIZER_URL}/gallery/${pathname}`}
        alt={pathname}
        loading="eager"
        priority
        width={isPortrait ? 400 : 600}
        height={isPortrait ? 600 : 400}
        sizes={sizes}
        className={imageClassNames}
      />
    </div>
  );
}
