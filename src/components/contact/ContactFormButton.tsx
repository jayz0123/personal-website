import { Control } from 'react-hook-form';

import { Sen } from 'next/font/google';

import { Button, ButtonGroup } from '@nextui-org/button';

import type { ContactFormSend } from '@/lib/definitions';

import { CheckIcon, ExclamationIcon, SendIcon } from '../ui/Icons';
import { FileDropdown } from './FileDropdown';

export function ContactFormButton({
  control,
  isSubmitting,
  isDirty,
  isValid,
  isSubmitSuccessful,
  response,
}: {
  control: Control<ContactFormSend, any>;
  isSubmitting: boolean;
  isDirty: boolean;
  isValid: boolean;
  isSubmitSuccessful: boolean;
  response: string | null;
}) {
  const determineButtonColor = () => {
    if (isSubmitting) return 'default';
    if (response) {
      return isSubmitSuccessful ? 'success' : 'danger';
    }
    if (isDirty) {
      return isValid ? 'success' : 'warning';
    }
    return 'default';
  };

  return (
    <ButtonGroup className="w-full">
      <FileDropdown control={control} isDisabled={isSubmitting} />
      <Button
        type="submit"
        variant={'shadow'}
        color={determineButtonColor()}
        isLoading={isSubmitting}
        isDisabled={isSubmitting}
        startContent={
          response && !isSubmitting ? (
            isSubmitSuccessful ? (
              <CheckIcon />
            ) : (
              <ExclamationIcon />
            )
          ) : (
            !isSubmitting && <SendIcon />
          )
        }
        aria-label="send button"
        className="text-lg w-full"
      >
        {(!isSubmitting && response) || (isSubmitting ? 'Sending...' : 'Send')}
      </Button>
    </ButtonGroup>
  );
}
