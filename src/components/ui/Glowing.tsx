export default function Glowing({
  children,
  variant = 'input',
  isActive = false,
  className = '',
}: {
  children: React.ReactNode;
  variant?: 'input' | 'nav' | 'gallery';
  isActive?: boolean;
  className?: string;
}) {
  return (
    <div className={`relative group ${className}`}>
      <div
        className={`-z-10 absolute -inset-1 bg-gradient-to-br from-cyan-200 to-blue-500 opacity-0 ${isActive && 'opacity-75'} ${variant === 'nav' && isActive && 'opacity-75'} ${variant === 'gallery' && 'blur rounded-large opacity-25 betterhover:group-hover:opacity-75'} ${variant === 'input' && ' rounded-large opacity-0 group-focus-within:opacity-75 group-focus-within:blur'} transition-all duration-300 ease-in-out`}
      />
      <div
        autoFocus
        className={`${variant === 'gallery' ? 'bg-background' : 'bg-none'} rounded-large min-h-full min-w-full flex justify-center`}
      >
        {children}
      </div>
    </div>
  );
}
