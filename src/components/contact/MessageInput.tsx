'use client';

import { useFormContext } from 'react-hook-form';

import { Textarea } from '@nextui-org/input';

import { Glowing } from '../ui';

export function MessageInput() {
  const {
    register,
    getFieldState,
    formState: { isSubmitting },
  } = useFormContext();

  return (
    <Glowing className="grow min-h-fit">
      <Textarea
        {...register('message', {
          required: 'Please enter a message',
          validate: {
            notEmpty: (value) =>
              value.trim() !== '' ||
              'Message cannot be empty or whitespace only',
          },
        })}
        label="Message"
        isRequired
        isDisabled={isSubmitting}
        isInvalid={getFieldState('message').invalid}
        errorMessage={getFieldState('message').error?.message}
        size="lg"
        classNames={{
          base: 'min-h-[25dvh] grow',
          inputWrapper: 'min-h-max align-start grow',
          input: 'min-h-max grow min-h-full',
          helperWrapper: 'absolute right-[36px] top-[8px]',
        }}
      />
    </Glowing>
  );
}
