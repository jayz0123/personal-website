export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col grow xl:flex-row xl:space-x-16 items-center">
      {children}
    </section>
  );
}
