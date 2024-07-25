'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';

import { BreadcrumbItem, Breadcrumbs } from '@nextui-org/breadcrumbs';

import { PhotoCardWithArea } from './PhotoCardWithArea';

export function PhotoCardContainer({
  children,
  areaPhotoCovers,
}: {
  children: React.ReactNode;
  areaPhotoCovers: Record<
    string,
    { area: string; thumbnailURL: string; blurDataURL: string }[]
  >;
}) {
  const { country: currentCountry, area: currentArea } = useParams();

  return Object.entries(areaPhotoCovers).map(
    ([country, photoData], countryIndex) => (
      <div
        id={country.replace(/ /g, '-')}
        key={countryIndex}
        className="flex flex-col items-center min-w-full"
      >
        <Breadcrumbs
          size="lg"
          underline="hover"
          className="font-bold uppercase mb-4"
          itemClasses={{
            item: 'text-xl',
          }}
        >
          <BreadcrumbItem>
            <Link href={'/gallery/#' + country.replace(/ /g, '-')}>
              {country}
            </Link>
          </BreadcrumbItem>
          {currentCountry === country.replace(/ /g, '-') ? (
            <BreadcrumbItem>{currentArea}</BreadcrumbItem>
          ) : null}
        </Breadcrumbs>

        <div className="min-w-full gap-2 grid grid-cols-12">
          {currentCountry === country.replace(/ /g, '-')
            ? children
            : photoData.map(
                ({ area, thumbnailURL, blurDataURL }, areaIndex) => (
                  <PhotoCardWithArea
                    key={areaIndex}
                    src={thumbnailURL}
                    blurDataURL={blurDataURL}
                    country={country}
                    area={area}
                    priority={
                      countryIndex < 1 && areaIndex === 0 ? true : false
                    }
                  />
                ),
              )}
        </div>
      </div>
    ),
  );
}
