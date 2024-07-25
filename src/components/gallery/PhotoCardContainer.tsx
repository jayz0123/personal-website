import { PhotoCardWithArea } from './PhotoCardWithArea';

export function PhotoCardContainer({
  country,
  areaPhotoCovers,
}: {
  country: string;
  areaPhotoCovers: {
    area: string;
    thumbnailURL: string;
    blurDataURL: string;
  }[];
}) {
  return areaPhotoCovers.map(
    ({ area, thumbnailURL, blurDataURL }, areaIndex) => (
      <div key={areaIndex} className="col-span-12 xl:col-span-4 md:col-span-6">
        <PhotoCardWithArea
          src={thumbnailURL}
          blurDataURL={blurDataURL}
          country={country}
          area={area}
        />
      </div>
    ),
  );
}
