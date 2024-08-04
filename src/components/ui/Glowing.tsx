import clsx from 'clsx';

export function Glowing({
  children,
  variant = 'input',
  isActive = false,
  className = '',
}: {
  children: React.ReactNode;
  variant?: 'input' | 'gallery';
  isActive?: boolean;
  className?: string;
}) {
  return (
    <div className={clsx('relative group', className)}>
      <div
        className={clsx(
          '-z-10 absolute -inset-1 bg-gradient-to-br from-sky-500 to-cyan-500 opacity-0 transition-all duration-300 ease-in-out',
          {
            'opacity-75': isActive,
            'blur rounded-large opacity-45 betterhover:group-hover:opacity-90':
              variant === 'gallery',
            'rounded-large opacity-0 group-focus-within:opacity-75 group-focus-within:blur':
              variant === 'input',
          },
        )}
      />
      <div
        autoFocus
        className={clsx(
          'rounded-large min-h-full min-w-full flex justify-center',
          {
            'bg-background': variant === 'gallery',
            'bg-none': variant !== 'gallery',
          },
        )}
      >
        {children}
      </div>
    </div>
  );
}
