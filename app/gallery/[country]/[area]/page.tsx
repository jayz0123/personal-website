import { listFilePaths, listFolders } from '@/utils/aws/s3';
import PhotoCard from '@/components/PhotoCard';
import PhotoCardContainer from '@/components/PhotoCardContainer';

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
  console.log(area);
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
