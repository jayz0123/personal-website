import { authCached } from '@/auth';

import { findAreaPhotoCoversForEveryCountryCached } from '@/services/db/gallery';

import { PhotoCardContainer, PhotoCardPreview } from '@/components/gallery';
import { PhotoUpload } from '@/components/gallery/admin/PhotoUpload';

export default async function Gallery() {
  const session = await authCached();
  const areaPhotoCovers = await findAreaPhotoCoversForEveryCountryCached();

  return (
    <>
      {Object.entries(areaPhotoCovers!).map(([country, photoData], index) => (
        <PhotoCardContainer key={index} breadcrumbs={[country]}>
          {photoData.map(({ area, thumbnailURL, blurDataURL }, index) => (
            <PhotoCardPreview
              key={index}
              src={thumbnailURL}
              blurDataURL={blurDataURL}
              country={country}
              area={area}
              priority={index < 4 ? true : false}
            />
          ))}
        </PhotoCardContainer>
      ))}
      {session?.user.role === 'admin' && <PhotoUpload />}
    </>
  );
}
