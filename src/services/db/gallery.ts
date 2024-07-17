import { unstable_cache } from 'next/cache';

import prisma, { Prisma } from '@/lib/prisma';

export async function createPhoto(
  photoWithoutPlace: Prisma.PhotoCreateWithoutPlaceInput,
  place: Prisma.PlaceCreateWithoutPhotosInput,
) {
  try {
    const _ = await prisma.photo.create({
      data: {
        ...photoWithoutPlace,
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
  } catch (e) {
    console.log(e);
  }
}

const findAreaPhotoCoversForEveryCountry = async () => {
  try {
    console.log('querying findAreaPhotoCoversForEveryCountry');
    const areaPhotoCoversForEveryCountry = await prisma.place.findMany({
      select: {
        country: true,
        area: true,
        photos: {
          take: 1,
          select: {
            thumbnailURL: true,
            blurDataURL: true,
          },
        },
      },
      orderBy: [
        {
          country: 'asc',
        },
        {
          area: 'asc',
        },
      ],
    });

    return areaPhotoCoversForEveryCountry.reduce(
      (acc, { country, area, photos }) => {
        if (!acc[country]) {
          acc[country] = [];
        }

        acc[country].push({
          area,
          thumbnailURL: photos[0].thumbnailURL,
          blurDataURL: photos[0].blurDataURL,
        });

        return acc;
      },
      {} as Record<
        string,
        { area: string; thumbnailURL: string; blurDataURL: string }[]
      >,
    );
  } catch (e) {
    console.log(e);
  }
};

const findAreasForEveryCountry = async () => {
  try {
    console.log('querying findAreasForEveryCountry');
    const areasForEveryCountry = await prisma.place.findMany({
      select: {
        country: true,
        area: true,
      },
      orderBy: [
        {
          country: 'asc',
        },
        {
          area: 'asc',
        },
      ],
    });

    return areasForEveryCountry.reduce(
      (acc, { country, area }) => {
        if (!acc[country]) {
          acc[country] = [];
        }

        acc[country].push(area);

        return acc;
      },
      {} as Record<string, string[]>,
    );
  } catch (e) {
    console.log(e);
  }
};

const findPhotoThumbnailsForCountryArea = async (
  country: string,
  area: string,
) => {
  try {
    console.log('querying findPhotosForCountryArea');
    const photosForCountryArea = await prisma.photo.findMany({
      where: {
        placeCountry: country,
        placeArea: area,
      },
      select: {
        id: true,
        thumbnailURL: true,
        blurDataURL: true,
      },
      orderBy: {
        title: 'asc',
      },
    });

    return photosForCountryArea;
  } catch (e) {
    console.log(e);
  }
};

const findPhotoIdsForCountryArea = async (country: string, area: string) => {
  try {
    console.log('querying findPhotoIdsForCountryArea');
    const photoIdsForCountryArea = await prisma.photo.findMany({
      where: {
        placeCountry: country,
        placeArea: area,
      },
      select: {
        id: true,
      },
      orderBy: {
        title: 'asc',
      },
    });

    return photoIdsForCountryArea;
  } catch (e) {
    console.log(e);
  }
};

const findPhotoForId = async (id: string) => {
  try {
    console.log('querying findPhotoForId');
    const photoForId = await prisma.photo.findUnique({
      where: {
        id,
      },
    });

    return photoForId;
  } catch (e) {
    console.log(e);
  }
};

export const findAreaPhotoCoversForEveryCountryCached = unstable_cache(
  findAreaPhotoCoversForEveryCountry,
  ['area-photo-covers-for-every-country'],
);

export const findAreasForEveryCountryCached = unstable_cache(
  findAreasForEveryCountry,
  ['areas-for-every-country'],
);

export const findPhotoThumbnailsForCountryAreaCached = unstable_cache(
  findPhotoThumbnailsForCountryArea,
  ['photo-thumbnails-for-country-area'],
);

export const findPhotoIdsForCountryAreaCached = unstable_cache(
  findPhotoIdsForCountryArea,
  ['photo-ids-for-country-area'],
);

export const findPhotoForIdCached = unstable_cache(findPhotoForId, [
  'photo-for-id',
]);
