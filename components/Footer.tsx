import Image from "next/image";
import dio from "@/public/dio-avatar.png";

export default function Footer() {
  return (
    <footer className="footer footer-center p-4">
      <aside>
        <Image
          src={dio}
          width={50}
          height={50}
          alt="dio"
          placeholder="blur"
          className="rounded-full"
        />
        <p className="font-bold">
          Howie Jayz <br />
        </p>
        <p>Copyright © 2024 - All right reserved</p>
      </aside>
    </footer>
  );
}
