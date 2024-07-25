'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Router } from 'next/router';

import { Card, CardHeader } from '@nextui-org/card';

export function PhotoCardWithArea({
  src,
  blurDataURL,
  country,
  area,
  priority = false,
}: {
  src: string;
  blurDataURL: string;
  country: string;
  area: string;
  priority?: boolean;
}) {
  const router = useRouter();

  const countrySlug = country.replace(/ /g, '-');
  const areaSlug = area.replace(/ /g, '-');

  return (
    <Card
      isPressable
      disableRipple
      onPress={() =>
        router.push(`/gallery/${countrySlug}/${areaSlug}`, { scroll: false })
      }
      className="min-w-full h-[240px]"
    >
      <CardHeader className="w-fit justify-center overflow-hidden py-2 absolute bottom-1 left-1 ml-1 z-10">
        <p className="text-white text-md font-bold font-serif">
          {area.replace('-', ' ')}
        </p>
      </CardHeader>
      <Image
        src={src}
        placeholder="blur"
        blurDataURL={blurDataURL}
        alt={area}
        priority={priority}
        width={640}
        height={480}
        sizes="(max-width: 768px) 84vw, (max-width: 1280px) 42vw, 28vw"
        className="z-0 w-full h-full object-cover hover:scale-125 transition-transform transform-gpu duration-400 ease-in-out"
      />
    </Card>
  );
}
