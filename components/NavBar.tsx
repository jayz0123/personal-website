import Link from "next/link";
import Menu from "@/components/Menu";
import DropdownMenu from "@/components/DropdownMenu";
import Networking from "@/components/Networking";
import ThemeSwitch from "@/components/ThemeSwitch";
import { HomeIcon } from "@heroicons/react/24/solid";

// components/Header.tsx
export default function NavBar() {
  return (
    <nav className="navbar w-full">
      <div className="navbar-start">
        <DropdownMenu />
        <Link href="/" className="btn btn-ghost text-xl">
          <HomeIcon width="28" height="28" />
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <Menu isDropdown={false} />
      </div>
      <div className="navbar-end">
        <div className="flex flex-row">
          <Networking />
          <ThemeSwitch />
        </div>
      </div>
    </nav>
    // <header className="w-10/12 py-4 mt-6">
    //   <div className="flex flex-row justify-between items-center align-baseline">
    //     <Menu />
    //     <Networking />
    //   </div>
    // </header>
  );
}
