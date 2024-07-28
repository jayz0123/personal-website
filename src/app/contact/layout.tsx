import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact',
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col items-start xl:flex-row xl:space-x-16 xl:items-center mb-16">
      {children}
    </section>
  );
}
