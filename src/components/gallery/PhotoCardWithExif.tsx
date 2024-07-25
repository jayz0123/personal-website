'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { Card, CardFooter } from '@nextui-org/card';

import { IGalleryPhotoExif } from '@/lib/definitions';

export function PhotoCardWithExif({
  src,
  thumbnailURL,
  blurDataURL,
  country,
  area,
  id,
  exif,
  priority = false,
}: {
  src: string;
  thumbnailURL: string;
  blurDataURL: string;
  country: string;
  area: string;
  id: string;
  exif: IGalleryPhotoExif;
  priority?: boolean;
}) {
  const router = useRouter();

  const countrySlug = country.replace(/ /g, '-');
  const areaSlug = area.replace(/ /g, '-');

  return (
    <div className="col-span-12 xl:col-span-4 md:col-span-6">
      <Card
        isPressable
        disableRipple
        onPress={() =>
          router.push(`/gallery/${countrySlug}/${areaSlug}/photo/${id}`, {
            scroll: false,
          })
        }
        isFooterBlurred
        className="w-full h-[240px]"
      >
        <Image
          src={thumbnailURL}
          placeholder="blur"
          blurDataURL={blurDataURL}
          alt={src}
          priority={priority}
          width={640}
          height={480}
          sizes="(max-width: 768px) 84vw, (max-width: 1280px) 42vw, 28vw"
          className="z-0 w-full h-full object-cover hover:scale-125 transition-transform transform-gpu duration-400 ease-in-out"
        />
        <CardFooter className="absolute bg-white/30 bottom-0 z-10 justify-between p-2">
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
      </Card>
    </div>
  );
}
