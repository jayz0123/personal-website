'use client';

import { Button } from '@nextui-org/button';

import { revalidateDatabase } from '@/lib/actions';

export default function RevalidateButton({
  children,
  tag,
}: {
  children: React.ReactNode;
  tag: 'posts' | 'photos';
}) {
  return <Button onPress={() => revalidateDatabase(tag)}>{children}</Button>;
}
