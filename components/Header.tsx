import Navigation from '@/components/Navigation';
import Networking from '@/components/Networking';


// components/Header.tsx
export default function Header() {
  return (
    <header className="static bg-gradient-to-r from-slate-50 to-slate-500 dark:from-slate-950 dark:to-slate-500 py-4 rounded-full mx-4 mt-6">
      <div className="container mx-4 flex justify-between items-center px-4">
        <h1 className="text-2xl font-bold">Howie Jayz</h1>
        <Navigation />
        <Networking />
      </div>
    </header>
  );
}
