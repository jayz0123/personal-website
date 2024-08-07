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
      width={1200}
      height={628}
      sizes="100vw"
      className="object-cover rounded-lg max-w-full w-full"
    />
  );
});
