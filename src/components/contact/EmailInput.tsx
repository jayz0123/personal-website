'use client';

import { useFormContext } from 'react-hook-form';

import { Input } from '@nextui-org/input';

import { Glowing } from '../ui';

export function EmailInput() {
  const {
    register,
    getFieldState,
    formState: { isSubmitting },
  } = useFormContext();

  const regExp =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return (
    <Glowing>
      <Input
        {...register('email', {
          required: 'Please enter an email address',
          pattern: {
            value: regExp,
            message: 'Invalid email address',
          },
        })}
        label="Email"
        isRequired
        isClearable
        isDisabled={isSubmitting}
        isInvalid={getFieldState('email').invalid}
        errorMessage={getFieldState('email').error?.message}
        classNames={{
          helperWrapper: 'absolute right-[36px] top-[17px]',
        }}
      />
    </Glowing>
  );
}
