import Image from 'next/image';
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
      className="col-span-12 md:col-span-4 h-[300px]"
    >
      <CardHeader className="w-fit justify-center overflow-hidden py-2 absolute bottom-1 left-1 ml-1 z-10">
        <p className="text-white text-md uppercase font-bold">
          {area.replaceAll('_', ' ')}
        </p>
      </CardHeader>
      <Image
        src={src}
        alt={area}
        width={300}
        height={300}
        className="z-0 w-full h-full object-cover transform-gpu hover:scale-125 transition-transform duration-400 ease-in-out"
      />
    </Card>
  );
}
