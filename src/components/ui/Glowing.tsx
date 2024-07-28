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
        className={`-z-10 absolute -inset-1 bg-gradient-to-br from-cyan-200 to-blue-500 opacity-0 ${isActive && 'opacity-75'} ${variant === 'nav' && isActive && 'opacity-75'} ${variant === 'gallery' && 'rounded-xl blur-[84px] opacity-50 group-hover:opacity-65 group-hover:blur-xl'} ${variant === 'input' && ' rounded-large blur-3xl opacity-25 group-focus-within:opacity-75 group-focus-within:blur'} transition-all duration-300 ease-in-out`}
      />
      <div
        className={`${variant !== 'nav' ? 'bg-none' : ''} rounded-large min-h-full min-w-full flex justify-center`}
      >
        {children}
      </div>
    </div>
  );
}
