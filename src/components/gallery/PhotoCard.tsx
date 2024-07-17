'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { Card, CardHeader } from '@nextui-org/card';

export function PhotoCard({
  src,
  blurDataURL,
  country,
  area,
  id,
  priority = false,
}: {
  src: string;
  blurDataURL: string;
  country: string;
  area: string;
  id: string;
  priority?: boolean;
}) {
  const router = useRouter();

  return (
    <Card
      isPressable
      disableRipple
      onPress={() =>
        router.push(
          `/gallery/${country.replace(/ /g, '-')}/${area.replace(/ /g, '-')}/${id}`,
        )
      }
      className="col-span-12 xl:col-span-4 md:col-span-6 h-[240px]"
    >
      <Image
        src={src}
        placeholder="blur"
        blurDataURL={blurDataURL}
        alt={src}
        priority={priority}
        width={640}
        height={480}
        sizes="(max-width: 768px) 84vw, (max-width: 1280px) 42vw, 28vw"
        className="z-0 w-full h-full object-cover hover:scale-125 transition-transform transform-gpu duration-400 ease-in-out"
      />
    </Card>
  );
}
