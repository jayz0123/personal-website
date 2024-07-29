import { unstable_cache } from 'next/cache';

import prisma, { Prisma } from '@/lib/prisma';

// export Prisma.PhotoCreateWithoutPlaceInput for other usages
export type PhotoDatus = Prisma.PhotoCreateManyInput;
export type PhotoData = Prisma.PhotoCreateManyInput[];

export async function createPhoto({
  photoData,
  place,
}: {
  photoData: Prisma.PhotoCreateWithoutPlaceInput;
  place: Prisma.PlaceCreateWithoutPhotosInput;
}) {
  try {
    const _ = await prisma.photo.create({
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
  } catch (e) {
    console.log(e);
  }
}

const findCountries = async () => {
  try {
    console.log('querying findCountries');
    const countries = await prisma.place.findMany({
      select: {
        country: true,
      },
      distinct: ['country'],
      orderBy: {
        country: 'asc',
      },
    });

    return countries.map(({ country }) => {
      return { countrySlug: country.replace(/ /g, '-') };
    });
  } catch (e) {
    console.log(e);
  }
};

const findAreasForCountry = async (country: string) => {
  try {
    console.log('querying findAreasForCountry');
    const areas = await prisma.place.findMany({
      where: {
        country: country.replace(/-/g, ' '),
      },
      select: {
        area: true,
      },
      distinct: ['area'],
      orderBy: {
        area: 'asc',
      },
    });

    return areas.map(({ area }) => {
      return { areaSlug: area.replace(/ /g, '-') };
    });
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

const findPhotosForCountry = async (country: string) => {
  try {
    console.log('querying findPhotosForCountry');
    const photosForCountry = await prisma.photo.findMany({
      where: {
        placeCountry: country,
      },
      orderBy: {
        dateTime: 'asc',
      },
    });

    return photosForCountry;
  } catch (e) {
    console.log(e);
  }
};

export const findCountriesCached = unstable_cache(findCountries, ['countries']);
export const findAreasForCountryCached = unstable_cache(findAreasForCountry, [
  'areas-for-country',
]);
export const findPhotoIdsForCountryAreaCached = unstable_cache(
  findPhotoIdsForCountryArea,
  ['photo-ids-for-country-area'],
);
export const findPhotosForCountryCached = unstable_cache(findPhotosForCountry, [
  'photos-for-country',
]);
