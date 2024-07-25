'use client';

import React from 'react';

import { useParams, useRouter } from 'next/navigation';

import {
  Modal,
  ModalBody,
  ModalContent,
  useDisclosure,
} from '@nextui-org/modal';

export function PhotoModal({
  children,
  id,
}: {
  children: React.ReactNode;
  id: string;
}) {
  const router = useRouter();

  const { isOpen, onOpenChange } = useDisclosure({
    defaultOpen: true,
    onClose() {
      // setTimeout(() => router.back(), 200);
      // router.replace('/gallery', { scroll: false });
      router.back();
    },
    id,
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
