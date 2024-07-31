'use client';

import React from 'react';

import { useRouter } from 'next/navigation';

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
        wrapper: 'min-w-full',
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
