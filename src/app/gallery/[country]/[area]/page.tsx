import { listFilePaths, listFolders } from '@/services/aws-s3';
import { PhotoCard, PhotoCardContainer } from '@/components/gallery';

export const dynamicParams = false;

export async function generateStaticParams({
  params: { country },
}: {
  params: { country: string };
}) {
  const areas = await listFolders(`gallery/${country}/`);

  return areas.map((area) => ({
    area,
  }));
}

export default async function Area({
  params: { country, area },
}: {
  params: { country: string; area: string };
}) {
  const photoPaths = await listFilePaths(`gallery/${country}/${area}/`);

  return (
    <PhotoCardContainer breadcrumbs={[country, area]}>
      {photoPaths.map((photoPath, index) => (
        <PhotoCard
          key={index}
          src={photoPath}
          priority={index < 4 ? true : false}
        />
      ))}
    </PhotoCardContainer>
  );
}
