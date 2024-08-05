'use client';

import { useFormContext } from 'react-hook-form';

import { Input } from '@nextui-org/input';

import { Glowing } from '../ui';

export function NameInput() {
  const {
    register,
    formState: { isSubmitting },
  } = useFormContext();

  return (
    <Glowing>
      <Input
        {...register('name')}
        label="Name"
        autoFocus
        isClearable
        isDisabled={isSubmitting}
      />
    </Glowing>
  );
}
