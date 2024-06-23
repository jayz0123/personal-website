'use client';

import Image from 'next/image';

export default function Photo({ src }: { src: string }) {
  return (
    <>
      <Image
        onClick={() =>
          (document.getElementById(src) as HTMLDialogElement).showModal()
        }
        src={src}
        width={300}
        height={200}
        className="rounded-box w-full h-auto max-h-full object-cover shadow-lg shadow-base-content hover:scale-[1.02] transition-transform cursor-pointer"
        alt="photo"
      />
      <dialog id={src} className="modal">
        <div className="modal-box w-11/12 max-w-7xl max-h-screen bg-transparent p-0">
          <Image
            src={src}
            width={6000}
            height={920}
            className="rounded-box w-full h-auto max-h-screen object-contain"
            alt="photo"
          />
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}
