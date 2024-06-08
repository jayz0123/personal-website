import Link from 'next/link';
import Image from 'next/image';

export default function Networking() {
  return (
    <div className="flex flex-rpw space-x-4">
      <Link href="https://github.com/howiejayz" target="_blank">
        <Image
          height="32"
          width="32"
          src="/github.svg"
          alt="GitHub"
          className="w-8 h-8 transition duration-500 ease-in-out hover:invert dark:invert dark:hover:filter-none"
        />
      </Link>
      <Link href="https://linkedin.com/in/junhao-zh" target="_blank">
        <Image
          height={32}
          width={32}
          src="/linkedin.svg"
          alt="LinkedIn"
          className="w-8 h-8 icon transition duration-500 ease-in-out hover:filter-none"
        />
      </Link>
      <Link href="https://instagram.com/howiejayz" target="_blank">
        <Image
          height="32"
          width="32"
          src="/instagram.svg"
          alt="Instagram"
          className="w-8 h-8 icon transition duration-500 ease-in-out hover:filter-none"
        />
      </Link>
    </div>
  );
}