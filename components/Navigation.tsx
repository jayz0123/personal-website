import Link from "next/link";

import { BarsArrowDownIcon } from "@heroicons/react/24/solid";

export default function Navigation() {
  return (
    <nav>
      <ul className="hidden md:flex md:flex-row md:items-center md:justify-between space-x-4 font-bold text-2xl">
        <li>
          <Link
            href="/"
            className="hover:text-neutral-400 dark:hover:text-neutral-500 transition-colors duration-500"
          >
            Howie Jayz
          </Link>
        </li>
        <li>
          <Link
            href="/about"
            className="hover:text-neutral-400 dark:hover:text-neutral-500 transition-colors duration-500"
          >
            About
          </Link>
        </li>
        <li>
          <Link
            href="/blog"
            className="hover:text-neutral-400 dark:hover:text-neutral-500 transition-colors duration-500"
          >
            Blog
          </Link>
        </li>
        <li>
          <Link
            href="/contact"
            className="hover:text-neutral-400 dark:hover:text-neutral-500 transition-colors duration-500"
          >
            Contact
          </Link>
        </li>
      </ul>
    </nav>
  );
}
