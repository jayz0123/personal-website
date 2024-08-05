import clsx from 'clsx';

export function GlowingText({
  children,
  isActive = false,
  isHoverable = false,
  className = '',
}: {
  children: React.ReactNode;
  isActive?: boolean;
  isHoverable?: boolean;
  className?: string;
}) {
  if (!isActive) return <>{children}</>;

  return (
    <div className={`${className} flex gap-1 items-center relative`}>
      <span className="peer relative justify-center flex gap-1 items-center select-auto subpixel-antialiased">
        {children}
      </span>
      <span
        className={clsx(
          'absolute flex gap-1 -z-10 subpixel-antialiased blur-sm select-none',
          'bg-gradient-to-br from-sky-500 to-cyan-500 text-transparent bg-clip-text',
          'transition-all duration-300 ease-in-out',
          'translate-x-2 translate-y-2',
          {
            'peer-hover:translate-x-0 peer-hover:translate-y-0': isHoverable,
          },
        )}
      >
        {children}
      </span>
    </div>
  );
}
