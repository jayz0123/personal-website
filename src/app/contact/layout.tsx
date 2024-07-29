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
    <section className="flex flex-col items-center justify-stretch  xl:flex-row xl:space-x-16">
      {children}
    </section>
  );
}
