'use client';

import Image from 'next/image';
import { Card, CardHeader } from '@nextui-org/card';
import { useRouter } from 'next/navigation';

export default function PhotoCardPrewiew({
  src,
  priority = false,
  country,
  area,
}: {
  src: string;
  priority?: boolean;
  country: string;
  area: string;
}) {
  const router = useRouter();

  return (
    <Card
      isPressable
      disableRipple
      onPressEnd={(e) => router.push(`/gallery/${country}/${area}`)}
      className="col-span-12 xl:col-span-4 md:col-span-6 h-[240px] 2xl:h-[360px]"
    >
      <CardHeader className="w-fit justify-center overflow-hidden py-2 absolute bottom-1 left-1 ml-1 z-10">
        <p className="text-white text-md uppercase font-bold">
          {area.replaceAll('-', ' ')}
        </p>
      </CardHeader>
      <Image
        src={src}
        alt={area}
        priority={priority}
        width={450}
        height={300}
        sizes="(max-width: 768px) 84vw, (max-width: 1280px) 42vw, 28vw"
        className="z-0 w-full h-full object-cover hover:scale-125 transition-transform transform-gpu duration-400 ease-in-out"
      />
    </Card>
  );
}
