import Image from 'next/image';
import { Card, CardHeader } from '@nextui-org/card';

// const cloudFrontLoader = ({
//   src,
//   width,
//   quality,
// }: {
//   src: string;
//   width: number;
//   quality?: number;
// }) => {
//   if (quality) {
//     return `https://api.howiejayz.com/${src}?format=auto&quality=${quality}&width=${width}`;
//   }

//   return `https://api.howiejayz.com/${src}?format=auto&width=${width}`;
// };

export function PhotoCard({
  src,
  priority = false,
}: {
  src: string;
  priority?: boolean;
}) {
  return (
    <Card
      isPressable
      disableRipple
      className="col-span-12 xl:col-span-4 md:col-span-6 h-[240px]"
    >
      <Image
        // loader={cloudFrontLoader}
        src={`https://api.howiejayz.com/${src}?format=auto&quality=${75}&width=${720}`}
        alt={src}
        priority={priority}
        width={450}
        height={300}
        sizes="(max-width: 768px) 84vw, (max-width: 1280px) 42vw, 28vw"
        className="z-0 w-full h-full object-cover hover:scale-125 transition-transform transform-gpu duration-400 ease-in-out"
      />
    </Card>
  );
}
