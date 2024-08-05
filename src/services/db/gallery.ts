import { unstable_cache } from 'next/cache';

import prisma, { Prisma } from '@/lib/prisma';

export async function createPhoto({
  photoData,
  place,
}: {
  photoData: Prisma.PhotoCreateWithoutPlaceInput;
  place: Prisma.PlaceCreateWithoutPhotosInput;
}) {
  try {
    const { id } = await prisma.photo.create({
      data: {
        ...photoData,
        place: {
          connectOrCreate: {
            where: {
              country_area: place,
            },
            create: place,
          },
        },
      },
    });

    return id;
  } catch (e) {
    console.log(e);
  }
}

const findPhotos = async () => {
  try {
    console.log('querying findPhotos');
    const photos = await prisma.photo.findMany({
      orderBy: {
        dateTime: 'desc',
      },
    });

    return photos;
  } catch (e) {
    console.log(e);
  }
};

export const findPhotosCached = unstable_cache(findPhotos, ['photos'], {
  tags: ['photos'],
});
