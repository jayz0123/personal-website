import { memo } from 'react';

import Image from 'next/image';

export const PostCoverImage = memo(function PostCoverImage({
  src,
  alt,
  blurDataURL,
}: {
  src: string;
  alt: string;
  blurDataURL: string;
}) {
  return (
    <Image
      src={src}
      alt={alt}
      placeholder="blur"
      blurDataURL={blurDataURL}
      width={1280}
      height={720}
      sizes="100vw"
      className="object-cover rounded-lg aspect-[16/9] max-w-"
    />
  );
});
