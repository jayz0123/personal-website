export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="max-w-full prose sm:prose-sm md:prose-md lg:prose-xl xl:prose-xl 2xl:prose-2xl">
      {children}
    </section>
  );
}
