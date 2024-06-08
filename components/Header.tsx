import Navigation from '@/components/Navigation';
import Networking from '@/components/Networking';


// components/Header.tsx
export default function Header() {
  return (
    <header className="w-11/12 py-4 px-8 rounded-full mx-0 mt-6 bg-gradient-to-r from-slate-50 to-slate-500 dark:from-slate-950 dark:to-slate-500">
      <div className="flex flex-row justify-between items-center">
        <h1 className="text-2xl font-bold">Howie Jayz</h1>
        <Navigation />
        <Networking />
      </div>
    </header>
  );
}
