import clsx from 'clsx';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section
      className={clsx(
        'prose dark:prose-invert',
        'md:prose-lg lg:prose-xl',
        'prose-img:rounded-lg',
      )}
    >
      {children}
    </section>
  );
}
