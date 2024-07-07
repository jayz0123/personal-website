import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gallery',
};

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-y-16 items-center min-w-full">
      {children}
    </section>
  );
}
