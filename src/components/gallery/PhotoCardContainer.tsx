'use client';

import { useEffect } from 'react';

import {
  useParams,
  useRouter,
  useSelectedLayoutSegments,
} from 'next/navigation';

import { BreadcrumbItem, Breadcrumbs } from '@nextui-org/breadcrumbs';

import { PhotoCardPreview } from './PhotoCardPreview';

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
  const router = useRouter();
  const { country: currentCountry, area: currentArea } = useParams();

  useEffect(() => {
    currentArea && currentCountry
      ? router.prefetch(`/gallery/${currentCountry}/${currentArea}`)
      : router.prefetch(`/gallery`);
  }, [currentArea, currentCountry, router]);

  return Object.entries(areaPhotoCovers!).map(
    ([country, photoData], countryIndex) => (
      <div key={countryIndex} className="flex flex-col items-center min-w-full">
        <Breadcrumbs
          size="lg"
          underline="hover"
          className="font-bold uppercase mb-4"
          itemClasses={{
            item: 'text-xl',
          }}
        >
          <BreadcrumbItem
            onPress={() => {
              router.replace('/gallery', { scroll: false });
            }}
          >
            {country}
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
                  <PhotoCardPreview
                    key={areaIndex}
                    src={thumbnailURL}
                    blurDataURL={blurDataURL}
                    country={country}
                    area={area}
                    priority={
                      countryIndex < 2 && areaIndex === 0 ? true : false
                    }
                  />
                ),
              )}
        </div>
      </div>
    ),
  );
}
