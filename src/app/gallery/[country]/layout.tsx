export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="min-w-full gap-4 grid grid-cols-12">{children}</section>
  );
}
