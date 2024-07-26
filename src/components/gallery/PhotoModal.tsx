'use client';

import { type ElementRef, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

import { useRouter } from 'next/navigation';

export default function PhotoModal({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const dialogRef = useRef<ElementRef<'dialog'>>(null);

  useEffect(() => {
    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal();
    }
  }, []);

  const onDismiss = () => router.back();

  return createPortal(
    <dialog
      ref={dialogRef}
      className="modal backdrop-blur-lg"
      onClose={onDismiss}
    >
      <div className="modal-box p-0 min-w-min max-w-fit bg-transparent">
        {children}
      </div>
      <form method="dialog" className="modal-backdrop">
        <button className="cursor-default" />
      </form>
    </dialog>,
    document.getElementById('modal-root')!,
  );
}
