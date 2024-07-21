'use client';

import React from 'react';

import { useParams, useRouter } from 'next/navigation';

import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/modal';
import { useAnimation } from 'framer-motion';
import { animate } from 'framer-motion';

export function PhotoModal({
  children,
  id,
  orientation,
}: {
  children: React.ReactNode;
  id: string;
  orientation: string;
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
      hideCloseButton
      placement="center"
      backdrop="blur"
      classNames={{
        body: 'p-0',
        base: `sm:m-auto sm:mx-1 md:m-auto md:mx-1 ${orientation === 'left-bottom' ? 'max-h-[90vh] max-w-fit' : 'max-w-7xl max-h-min'}`,
      }}
    >
      <ModalContent>
        {(onClose) => <ModalBody>{children}</ModalBody>}
      </ModalContent>
    </Modal>
  );
}
