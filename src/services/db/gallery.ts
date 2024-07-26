import { unstable_cache } from 'next/cache';

import prisma, { Prisma } from '@/lib/prisma';

// export Prisma.PhotoCreateWithoutPlaceInput for other usages
export type PhotoDatus = Prisma.PhotoCreateManyInput;
export type PhotoData = Prisma.PhotoCreateManyInput[];

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

const findAreaPhotoCoversForCountry = async (country: string) => {
  try {
    console.log('querying findAreaPhotoCoversForCountry');
    const areaPhotoCoversForCountry = await prisma.place.findMany({
      where: {
        country: country.replace(/-/g, ' '),
      },
      select: {
        area: true,
        photos: {
          where: {
            isCover: {
              equals: true,
            },
          },
          select: {
            thumbnailURL: true,
            blurDataURL: true,
          },
        },
      },
      orderBy: {
        area: 'asc',
      },
    });

    return areaPhotoCoversForCountry.map(({ area, photos }) => ({
      areaSlug: area.replace(/ /g, '-'),
      thumbnailURL: photos[0].thumbnailURL,
      blurDataURL: photos[0].blurDataURL,
    }));
  } catch (e) {
    console.log(e);
  }
};

const findAreaPhotoCoversForEveryCountry = async () => {
  try {
    console.log('querying findAreaPhotoCoversForEveryCountry');
    const areaPhotoCoversForEveryCountry = await prisma.place.findMany({
      select: {
        country: true,
        area: true,
        photos: {
          where: {
            isCover: {
              equals: true,
            },
          },
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
          areaSlug: area.replace(/ /g, '-'),
          thumbnailURL: photos[0].thumbnailURL,
          blurDataURL: photos[0].blurDataURL,
        });

        return acc;
      },
      {} as Record<
        string,
        { areaSlug: string; thumbnailURL: string; blurDataURL: string }[]
      >,
    );
  } catch (e) {
    console.log(e);
  }
};

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

const findPhotosForCountryArea = async (country: string, area: string) => {
  try {
    console.log('querying findPhotosForCountryArea');
    const photosForCountryArea = await prisma.photo.findMany({
      where: {
        placeCountry: country.replace(/-/g, ' '),
        placeArea: area.replace(/-/g, ' '),
      },
      orderBy: {
        dateTime: 'asc',
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

export const findPhotosForCountryCached = unstable_cache(findPhotosForCountry, [
  'photos-for-country',
]);

export const findAreaPhotoCoversForCountryCached = unstable_cache(
  findAreaPhotoCoversForCountry,
  ['area-photo-covers-for-country'],
);

export const findAreaPhotoCoversForEveryCountryCached = unstable_cache(
  findAreaPhotoCoversForEveryCountry,
  ['area-photo-covers-for-every-country'],
);

export const findAreasForCountryCached = unstable_cache(findAreasForCountry, [
  'areas-for-country',
]);

export const findAreasForEveryCountryCached = unstable_cache(
  findAreasForEveryCountry,
  ['areas-for-every-country'],
);

export const findPhotosForCountryAreaCached = unstable_cache(
  findPhotosForCountryArea,
  ['photos-for-country-area'],
);

export const findPhotoIdsForCountryAreaCached = unstable_cache(
  findPhotoIdsForCountryArea,
  ['photo-ids-for-country-area'],
);

export const findPhotoForIdCached = unstable_cache(findPhotoForId, [
  'photo-for-id',
]);

export const findCountriesCached = unstable_cache(findCountries, ['countries']);
