'use client';

import React, { Suspense } from 'react';

import { useRouter } from 'next/navigation';

import {
  Modal,
  ModalBody,
  ModalContent,
  useDisclosure,
} from '@nextui-org/modal';
import clsx from 'clsx';

import { NavProgress } from '../ui';

export function PhotoModal({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const { isOpen, onOpenChange } = useDisclosure({
    defaultOpen: true,
    onClose() {
      router.back();
    },
  });

  return (
    <Suspense fallback={<NavProgress />}>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="center"
        backdrop="blur"
        classNames={{
          wrapper: 'min-w-full',
          body: 'p-0',
          base: clsx(
            'items-center justify-center',
            'max-w-[90vw] max-h-[90vh] w-fit h-fit sm:my-auto',
            'bg-gradient-to-br bg-transparent from-cyan-200/25 to-blue-500/25',
          ),
        }}
      >
        <ModalContent>
          {(onClose) => <ModalBody>{children}</ModalBody>}
        </ModalContent>
      </Modal>
    </Suspense>
  );
}
