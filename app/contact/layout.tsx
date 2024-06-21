export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col w-full xl:flex-row xl:space-x-16 mt-16 mb-8 xl:mt-32 items-center">
      {children}
    </section>
  );
}
