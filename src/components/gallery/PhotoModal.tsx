'use client';

import { Suspense, useCallback, useEffect } from 'react';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

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
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const deleteQuery = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('photo');
    return params.toString();
  }, [searchParams]);

  useEffect(() => {
    router.prefetch(pathname + '?' + deleteQuery());
  }, [deleteQuery, pathname, router]);

  const { isOpen, onOpenChange } = useDisclosure({
    defaultOpen: true,
    onClose() {
      router.push(pathname + '?' + deleteQuery(), {
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
