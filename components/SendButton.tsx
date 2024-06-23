import {
  CheckIcon,
  XMarkIcon,
  PaperAirplaneIcon,
} from '@heroicons/react/24/solid';
import { Button, ButtonGroup } from '@nextui-org/button';

export default function SendButton({
  isSending,
  isSent,
  success,
  prompt,
  size = 24,
}: {
  isSending: boolean;
  isSent: boolean;
  success?: boolean;
  prompt?: string;
  size?: number;
}) {
  return (
    <Button
      type="submit"
      // variant={''}
      color={isSent ? (success ? 'success' : 'danger') : 'default'}
      isLoading={isSending}
      isDisabled={isSending || isSent}
      startContent={
        isSent ? (
          success ? (
            <CheckIcon width={size} height={size} />
          ) : (
            <XMarkIcon width={size} height={size} />
          )
        ) : !isSending ? (
          <PaperAirplaneIcon width={size} height={size} />
        ) : null
      }
      aria-label="send message button"
      className="text-lg"
    >
      {isSending ? 'Sending' : isSent ? prompt : 'Send'}
    </Button>
  );
}
