export default function Glowing({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`relative group ${className}`}>
      <div className="rounded-large -z-10 absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-500 blur opacity-0 group-focus-within:opacity-75 transition-opacity duration-300 ease-in-out" />
      <div className="bg-background rounded-large min-h-full flex">
        {children}
      </div>
    </div>
  );
}
