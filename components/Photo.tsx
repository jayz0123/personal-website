import { Image } from '@nextui-org/image';
import NextImage from 'next/image';

export default function Photo({ src }: { src: string }) {
  return (
    <Image
      as={NextImage}
      src={src}
      width={300}
      height={200}
      quality={20}
      className="rounded-box w-full h-auto max-h-full object-cover shadow-lg shadow-base-content hover:scale-[1.02] transition-transform cursor-pointer"
      alt="photo"
    />
  );
}
