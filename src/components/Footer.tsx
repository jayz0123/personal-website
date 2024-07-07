import Image from 'next/image';
import dio_avatar from '../../public/dio-avatar.png';

export default function Footer() {
  return (
    <div className="w-full flex flex-col">
      <div className="divider divider-vertical mx-32 xl:opacity-0" />
      <footer className="footer footer-center pb-4">
        <aside>
          <Image
            src={dio_avatar}
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
    </div>
  );
}
