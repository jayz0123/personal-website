'use client';

import { Suspense, useEffect } from 'react';

import { usePathname, useRouter } from 'next/navigation';

import {
  Modal,
  ModalBody,
  ModalContent,
  useDisclosure,
} from '@nextui-org/modal';
import clsx from 'clsx';

import { useQueryString } from '@/utils/hooks';

import { NavProgress } from '../../ui';

export function PhotoModal({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const deleteQueryString = useQueryString('delete');
  const pathname = usePathname();

  const queryString = deleteQueryString('photo');

  useEffect(() => {
    router.prefetch(pathname + '?' + queryString);
  }, [pathname, queryString, router]);

  const { isOpen, onOpenChange } = useDisclosure({
    defaultOpen: true,
    onClose() {
      router.push(pathname + '?' + queryString, {
        scroll: false,
      });
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
            'bg-transparent',
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
