import { Control } from 'react-hook-form';
import { Button, ButtonGroup } from '@nextui-org/button';
import {
  CheckIcon,
  XMarkIcon,
  PaperAirplaneIcon,
} from '@heroicons/react/24/solid';

import { IFormInput } from './types';
import { FileDropdown } from './FileDropdown';

export function ContactFormButton({
  control,
  isSubmitting,
  isDirty,
  isValid,
  isSubmitSuccessful,
  response,
}: {
  control: Control<IFormInput, any>;
  isSubmitting: boolean;
  isDirty: boolean;
  isValid: boolean;
  isSubmitSuccessful: boolean;
  response: string | null;
}) {
  const IconSize = 24;

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
              <CheckIcon width={IconSize} height={IconSize} />
            ) : (
              <XMarkIcon width={IconSize} height={IconSize} />
            )
          ) : (
            !isSubmitting && (
              <PaperAirplaneIcon width={IconSize} height={IconSize} />
            )
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
