import Image from 'next/image';
import { Card, CardHeader } from '@nextui-org/card';

export default function PhotoCard({
  src,
  loading = 'lazy',
  area,
}: {
  src: string;
  loading?: 'eager' | 'lazy' | undefined;
  area: string;
}) {
  return (
    <Card
      isPressable
      disableRipple
      className="col-span-12 xl:col-span-4 md:col-span-6 h-[300px]"
    >
      <CardHeader className="w-fit justify-center overflow-hidden py-2 absolute bottom-1 left-1 ml-1 z-10">
        <p className="text-white text-md uppercase font-bold">
          {area.replaceAll('_', ' ')}
        </p>
      </CardHeader>
      <Image
        src={src}
        alt={area}
        loading={loading}
        width={300}
        height={200}
        sizes="(max-width: 768px) 84vw, (max-width: 1280px) 42vw, 28vw"
        className="z-0 w-full h-full object-cover hover:scale-125 transition-transform transform-gpu duration-400 ease-in-out"
      />
    </Card>
  );
}
