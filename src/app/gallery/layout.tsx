import { Metadata } from 'next';

import { authCached } from '@/auth';

import RevalidateButton from '@/components/admin/RevalidateButton';
import { PhotoUploadForm } from '@/components/gallery/admin/PhotoUploadForm';

export const metadata: Metadata = {
  title: {
    template: '%s | Gallery',
    default: 'Gallery',
  },
};

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await authCached();

  return (
    <section
      aria-label="gallery"
      className="lg:max-w-[calc(130ch+4rem)] m-auto"
    >
      {children}
      {session?.user?.role === 'admin' && (
        <div className="flex flex-col mt-16 gap-y-4">
          <RevalidateButton tag="photos">Revalidate Photos</RevalidateButton>
          <PhotoUploadForm />
        </div>
      )}
    </section>
  );
}
