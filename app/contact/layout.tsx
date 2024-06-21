export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col w-full xl:flex-row xl:space-x-20 my-12 xl:my-32 items-center">
      {children}
    </section>
  );
}
