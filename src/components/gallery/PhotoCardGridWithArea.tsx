import { PhotoCardWithArea } from './PhotoCardWithArea';

export function PhotoCardGridWithArea({
  countrySlug,
  areaPhotoCovers,
}: {
  countrySlug: string;
  areaPhotoCovers: {
    areaSlug: string;
    thumbnailURL: string;
    blurDataURL: string;
  }[];
}) {
  return areaPhotoCovers.map(
    ({ areaSlug, thumbnailURL, blurDataURL }, index) => (
      <div key={index} className="col-span-12 xl:col-span-4 md:col-span-6">
        <PhotoCardWithArea
          src={thumbnailURL}
          blurDataURL={blurDataURL}
          countrySlug={countrySlug}
          areaSlug={areaSlug}
        />
      </div>
    ),
  );
}
