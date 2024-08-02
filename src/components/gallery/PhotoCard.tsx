'use client';

import { useCallback, useEffect } from 'react';

import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { Card, CardFooter, CardHeader } from '@nextui-org/card';

import { GalleryPhotoExif } from '@/lib/definitions';

// Define a type that contains the common properties between the two components
type PhotoCardProps = {
  slugs: string[];
  photoSlug: string;
  thumbnailURL: string;
  blurDataURL: string;
  photoArea: string;
  photoAreaSlug: string;
  orientation?: string | null;
  exif?: GalleryPhotoExif;
};

export function PhotoCard({
  slugs,
  photoSlug,
  thumbnailURL,
  blurDataURL,
  photoArea,
  photoAreaSlug,
  orientation,
  exif,
}: PhotoCardProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentAreaSlug = slugs?.[1];

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  const photoQuery = createQueryString('photo', photoSlug);
  const orientationQuery = createQueryString(
    'orientation',
    orientation || 'top-left',
  );

  const nextPathname =
    currentAreaSlug && photoSlug
      ? `/gallery/${slugs.join('/')}?${photoQuery}&${orientationQuery}`
      : `/gallery/${slugs.join('/')}/${photoAreaSlug}`;

  useEffect(() => {
    router.prefetch(nextPathname);
  }, [nextPathname, router]);

  const handlePress = () => {
    router.push(nextPathname, {
      scroll: false,
    });
  };

  return (
    <Card
      isPressable
      disableRipple
      onPress={handlePress}
      isFooterBlurred={currentAreaSlug ? true : false}
      className="w-full h-[240px] shadow-none"
    >
      {!currentAreaSlug && (
        <CardHeader className="w-fit justify-center overflow-hidden py-2 absolute bottom-1 left-1 ml-1 z-10">
          <p className="text-white text-md font-bold font-serif">{photoArea}</p>
        </CardHeader>
      )}
      <Image
        src={thumbnailURL}
        placeholder="blur"
        blurDataURL={blurDataURL}
        alt={thumbnailURL}
        priority={true}
        width={640}
        height={480}
        sizes="(max-width: 768px) 84vw, (max-width: 1280px) 42vw, 28vw"
        className="z-0 w-full h-full object-cover hover:scale-125 transition-transform transform-gpu duration-400 ease-in-out"
      />
      {currentAreaSlug && (
        <CardFooter className="absolute bg-white/30 bottom-0 z-10 justify-center p-2">
          <div>
            <p className="text-white text-tiny flex space-x-3 justify-between font-serif">
              <span>{exif?.make}</span>
              <span>{exif?.model}</span>
              <span>{exif?.lensModel}</span>
              <span>{exif?.exposureTime}</span>
              <span>{exif?.fNumber}</span>
              <span>{exif?.iso}</span>
            </p>
          </div>
        </CardFooter>
      )}
    </Card>
  );
}
