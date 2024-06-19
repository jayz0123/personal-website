import Link from "next/link";
import {
  PencilSquareIcon,
  FolderOpenIcon,
  CameraIcon,
  ChatBubbleLeftEllipsisIcon,
} from "@heroicons/react/24/solid";

export default function Menu({ isDropdown }: { isDropdown: boolean }) {
  const size = 24;

  return (
    <ul
      tabIndex={isDropdown ? 0 : undefined}
      className={`menu text-lg
        ${
          isDropdown
            ? "bg-base-200 text-lg w-60 dropdown-content mt-3 z-30 p-2 shadow rounded-box"
            : "menu-horizontal"
        }
      `}
    >
      <li>
        <Link href="/thoughts">
          <PencilSquareIcon width={size} height={size} />
          Thoughts
        </Link>
      </li>
      <li>
        <Link href="/projects">
          <FolderOpenIcon width={size} height={size} />
          Projects
        </Link>
      </li>
      <li>
        <Link href="/gallery">
          <CameraIcon width={size} height={size} />
          Gallery
        </Link>
      </li>
      <li>
        <Link href="/contact">
          <ChatBubbleLeftEllipsisIcon width={size} height={size} />
          Contact
        </Link>
      </li>
    </ul>
  );
}
