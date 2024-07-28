export default function GlowingText({
  children,
  isActive = false,
  className = '',
}: {
  children: React.ReactNode;
  isActive?: boolean;
  className?: string;
}) {
  if (!isActive)
    return (
      <div className={`${className} flex gap-1 items-center`}>{children}</div>
    );

  return (
    <div className={`${className} flex gap-1 items-center relative`}>
      <span className="peer relative justify-center flex gap-1 items-center text-center select-auto subpixel-antialiased">
        {children}
      </span>
      <span className="-z-10 transition-all duration-300 ease-in-out blur-sm absolute flex gap-1 bg-gradient-to-br from-cyan-200 to-blue-500 bg-clip-text box-content text-transparent text-center select-none translate-x-2 translate-y-2 peer-hover:blur-lg subpixel-antialiased">
        {children}
      </span>
    </div>
  );
}
