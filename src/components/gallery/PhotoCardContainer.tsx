'use client';

import { ReactElement, useState } from 'react';

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

  console.log(currentCountry);

  return Object.entries(areaPhotoCovers!).map(([country, photoData], index) => (
    <div key={index} className="flex flex-col items-center min-w-full">
      <Breadcrumbs
        size="lg"
        underline="hover"
        className="font-bold uppercase mb-4"
        itemClasses={{
          item: 'text-xl',
        }}
      >
        <BreadcrumbItem
          key={index}
          onPress={() => {
            router.back();
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
          : photoData.map(({ area, thumbnailURL, blurDataURL }, index) => (
              <PhotoCardPreview
                key={index}
                src={thumbnailURL}
                blurDataURL={blurDataURL}
                country={country}
                area={area}
                priority={index < 4 ? true : false}
              />
            ))}
      </div>
    </div>
  ));
}
