import Navigation from "@/components/Navigation";
import Networking from "@/components/Networking";

// components/Header.tsx
export default function Header() {
  return (
    <header className="w-10/12 py-4 mt-6">
      <div className="flex flex-row justify-between items-center align-baseline">
        <Navigation />
        <Networking />
      </div>
    </header>
  );
}
