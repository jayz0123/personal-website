import NextImage from 'next/image';
import { Image } from '@nextui-org/image';
import { Card, CardHeader } from '@nextui-org/card';

export default function PhotoCard({
  src,
  area,
}: {
  src: string;
  area: string;
}) {
  return (
    <Card
      isPressable
      disableRipple
      className="col-span-12 sm:col-span-4 h-[300px]"
    >
      <CardHeader className="backdrop-blur-3xl justify-center before:bg-white/10 border-white/20 border-1 overflow-hidden py-2 absolute before:rounded-xl rounded-large top-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
        <p className="text-white text-sm uppercase font-bold">
          {area.replaceAll('_', ' ')}
        </p>
      </CardHeader>
      <Image
        as={NextImage}
        removeWrapper
        isZoomed
        src={src}
        alt={area}
        width={400}
        height={400}
        className="z-0 w-full h-full object-cover"
      />
    </Card>
  );
}
