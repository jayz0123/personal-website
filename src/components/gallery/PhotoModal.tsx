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
      setTimeout(() => router.back(), 200);
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
        base: `items-center justify-center bg-transparent max-w-[90vw] max-h-[90vh] w-fit h-fit`,
      }}
    >
      <ModalContent>
        {(onClose) => <ModalBody>{children}</ModalBody>}
      </ModalContent>
    </Modal>
  );
}
