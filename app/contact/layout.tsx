export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="flex flex-col xl:flex-row xl:space-x-20 my-12 xl:my-32 grow items-center">
        {children}
      </div>
    </section>
  );
}
