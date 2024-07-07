import { listFolders } from '@/services/aws-s3';

export const dynamicParams = false;

export async function generateStaticParams() {
  const countries = await listFolders('gallery/');

  return countries.map((country) => ({
    country,
  }));
}

export default function Layout({
  params,
  children,
}: {
  params: { country: string };
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
