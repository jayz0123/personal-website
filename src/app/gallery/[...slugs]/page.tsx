import { PhotoModalPage } from '@/components/gallery';
import { PhotoModal } from '@/components/gallery/PhotoModal';

export default async function Page({
  params: { slugs },
  searchParams,
}: {
  params: { slugs: string[] };
  searchParams: { [key: string]: string | undefined };
}) {
  if (slugs.length < 3) return null;

  const pathname = slugs.join('/');
  const { orientation } = searchParams;

  return (
    <PhotoModal>
      <PhotoModalPage pathname={pathname} orientation={orientation} />
    </PhotoModal>
  );
}
