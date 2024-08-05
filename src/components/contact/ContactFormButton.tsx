'use client';

import { useFormContext } from 'react-hook-form';

import { Button, ButtonGroup } from '@nextui-org/button';

import type { ContactEmailSendForm } from '@/lib/definitions';

import { CheckIcon, ExclamationIcon, SendIcon } from '../ui/Icons';
import { FileDropdown } from './FileDropdown';

export function ContactFormButton({ response }: { response: string | null }) {
  const {
    formState: { isSubmitting, isSubmitSuccessful, isValid, isDirty },
  } = useFormContext<ContactEmailSendForm>();

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
      <FileDropdown />
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
