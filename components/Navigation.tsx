// components/Navigation.tsx
import Link from 'next/link';

export default function Navigation() {
  return (
    <nav>
      <ul className="flex space-x-4 ">
        <li><Link href="/" className="hover:text-gray-200">Home</Link></li>
        <li><Link href="/about" className="hover:text-gray-200">About</Link></li>
        <li><Link href="/blog" className="hover:text-gray-200">Blog</Link></li>
        <li><Link href="/contact" className="hover:text-gray-200">Contact</Link></li>
      </ul>
    </nav>
  );
}
