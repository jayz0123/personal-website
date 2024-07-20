'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { Button } from '@nextui-org/button';
import { Card, CardFooter, CardHeader } from '@nextui-org/card';
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/modal';

import { IGalleryPhotoExif } from '@/lib/definitions';

export function PhotoCardWithModal({
  children,
  src,
  thumbnailURL,
  blurDataURL,
  country,
  area,
  id,
  exif,
  priority = false,
}: {
  children?: React.ReactNode;
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
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Card
        isPressable
        disableRipple
        isFooterBlurred
        onPress={onOpen}
        // onPress={() =>
        //   router.push(
        //     `/gallery/${country.replace(/ /g, '-')}/${area.replace(/ /g, '-')}/${id}`,
        //   )
        // }
        className="col-span-12 xl:col-span-4 md:col-span-6 h-[240px]"
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
        <CardFooter className="absolute bg-white/30 bottom-0 z-10 justify-between">
          <div>
            <p className="text-white text-tiny flex space-x-2 justify-between">
              <span>{exif.make}</span>
              <span>{exif.model}</span>
              <span>{exif.lensModel}</span>
              <span>{exif.exposureTime}</span>
              <span>{exif.fNumber}</span>
            </p>
          </div>
        </CardFooter>
      </Card>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        hideCloseButton
        placement="center"
        backdrop="blur"
        classNames={{
          body: 'p-0',
          base: `sm:m-auto sm:mx-1 md:m-auto md:mx-1 ${exif.orientation === 'left-bottom' ? 'max-h-[90vh] max-w-fit' : 'max-w-7xl max-h-min'}`,
        }}
      >
        <ModalContent>
          {(onClose) => (
            <ModalBody>
              <Image
                src={src}
                placeholder="blur"
                blurDataURL={blurDataURL}
                alt={src}
                loading="eager"
                width={
                  exif.orientation === 'left-bottom'
                    ? exif.height! / 3
                    : exif.width! / 3
                }
                height={
                  exif.orientation === 'left-bottom'
                    ? exif.width! / 3
                    : exif.height! / 3
                }
                sizes={`${exif.orientation === 'left-bottom' ? '60vh' : 'auto'}`}
                className={`z-0 object-contain rounded-lg ${exif.orientation === 'left-bottom' && 'max-h-min w-auto h-auto'}`}
              />
            </ModalBody>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
