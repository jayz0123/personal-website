'use client';

import React from 'react';

import { useParams, useRouter } from 'next/navigation';

import {
  Modal,
  ModalBody,
  ModalContent,
  useDisclosure,
} from '@nextui-org/modal';

export function PhotoModal({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const { isOpen, onOpenChange } = useDisclosure({
    defaultOpen: true,
    onClose() {
      router.back();
    },
  });

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement="center"
      backdrop="blur"
      classNames={{
        body: 'p-0',
        base: `items-center justify-center bg-transparent max-w-[90vw] max-h-[90vh] w-fit h-fit sm:my-auto`,
      }}
    >
      <ModalContent>
        {(onClose) => <ModalBody>{children}</ModalBody>}
      </ModalContent>
    </Modal>
  );
}

// 'use client';

// import { type ElementRef, useEffect, useRef } from 'react';
// import { createPortal } from 'react-dom';

// import { useRouter } from 'next/navigation';

// export default function PhotoModal({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const router = useRouter();
//   const dialogRef = useRef<ElementRef<'dialog'>>(null);

//   useEffect(() => {
//     if (!dialogRef.current?.open) {
//       dialogRef.current?.showModal();
//     }
//   }, []);

//   const onDismiss = () => router.back();

//   return createPortal(
//     <dialog
//       ref={dialogRef}
//       className="modal backdrop-blur-lg"
//       onClose={onDismiss}
//     >
//       <div className="modal-box p-0 min-w-min max-w-fit bg-transparent">
//         {children}
//       </div>
//       <form method="dialog" className="modal-backdrop">
//         <button className="cursor-default" />
//       </form>
//     </dialog>,
//     document.getElementById('modal-root')!,
//   );
// }
