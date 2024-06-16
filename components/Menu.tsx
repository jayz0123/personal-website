import Link from "next/link";

export default function Menu({ isDropdown }: { isDropdown: boolean }) {
  // const Details = ({ children }: { children: React.ReactNode }) => {
  //   return !isDropdown ? (
  //     <details>{children}</details>
  //   ) : (
  //     <details open={false}>{children}</details>
  //   );
  // };

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
        <a>Item 1</a>
      </li>
      <li>
        <details open={isDropdown ? true : false}>
          <summary>Projects</summary>
          <ul className="p-2">
            <li>
              <a>Submenu 1</a>
            </li>
            <li>
              <a>Submenu 2</a>
            </li>
          </ul>
        </details>
      </li>
      <li>
        <Link href="/contact">Contact</Link>
      </li>
    </ul>
  );
}
