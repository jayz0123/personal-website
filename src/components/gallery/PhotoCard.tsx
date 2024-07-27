'use client';

import { useEffect } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { Card, CardFooter, CardHeader } from '@nextui-org/card';

import type { PhotoDatus } from '@/services/db/gallery';

// Define a type that contains the common properties between the two components
type PhotoCardProps = {
  variant?: 'area' | 'exif'; // Determine which variant to render
  priority?: boolean;
  url: string;
  blurDataURL: string;
  countrySlug: string;
  areaSlug: string;
  id?: string; // Only needed if variant is 'exif'
  exif?: Omit<
    PhotoDatus,
    | 'placeCountry'
    | 'placeArea'
    | 'id'
    | 'url'
    | 'thumbnailURL'
    | 'blurDataURL'
    | 'updatedAt'
    | 'createdAt'
  >;
};

export function PhotoCard({
  variant = 'area',
  priority = false,
  url,
  blurDataURL,
  countrySlug,
  areaSlug,
  id,
  exif,
}: PhotoCardProps) {
  const router = useRouter();

  useEffect(() => {
    // Prefetch both potential routes to improve navigation speed
    if (variant === 'exif' && id) {
      router.prefetch(`/gallery/${countrySlug}/${areaSlug}/photo/${id}`);
    }
    router.prefetch(`/gallery/${countrySlug}/${areaSlug}`);
  }, [countrySlug, areaSlug, id, router, variant]);

  const handlePress = () => {
    if (variant === 'exif' && id) {
      router.push(`/gallery/${countrySlug}/${areaSlug}/photo/${id}`, {
        scroll: false,
      });
    } else {
      router.push(`/gallery/${countrySlug}/${areaSlug}`);
    }
  };

  return (
    <Card
      isPressable
      disableRipple
      onPress={handlePress}
      isFooterBlurred={variant === 'exif'}
      className="w-full h-[240px]"
    >
      {variant === 'area' && (
        <CardHeader className="w-fit justify-center overflow-hidden py-2 absolute bottom-1 left-1 ml-1 z-10">
          <p className="text-white text-md font-bold font-serif">
            {areaSlug.replace(/-/g, ' ')}
          </p>
        </CardHeader>
      )}
      <Image
        src={url}
        placeholder="blur"
        blurDataURL={blurDataURL}
        alt={url}
        priority={priority}
        width={640}
        height={480}
        sizes="(max-width: 768px) 84vw, (max-width: 1280px) 42vw, 28vw"
        className="z-0 w-full h-full object-cover hover:scale-125 transition-transform transform-gpu duration-400 ease-in-out"
      />
      {variant === 'exif' && exif && (
        <CardFooter className="absolute bg-white/30 bottom-0 z-10 justify-center p-2">
          <div>
            <p className="text-white text-tiny flex space-x-3 justify-between font-serif">
              <span>{exif.make}</span>
              <span>{exif.model}</span>
              <span>{exif.lensModel}</span>
              <span>{exif.exposureTime}</span>
              <span>{exif.fNumber}</span>
              <span>{exif.iso}</span>
            </p>
          </div>
        </CardFooter>
      )}
    </Card>
  );
}
