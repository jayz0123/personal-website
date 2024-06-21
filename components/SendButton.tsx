import {
  CheckIcon,
  XMarkIcon,
  PaperAirplaneIcon,
} from '@heroicons/react/24/solid';

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
    <button
      disabled={isSending}
      type="submit"
      className={`btn text-xl self-center ${
        isSent ? (success ? 'btn-success' : 'btn-error') : 'btn-ghost'
      }`}
      aria-label="send message button"
    >
      {isSending ? (
        <span className="loading loading-spinner" />
      ) : isSent ? (
        success ? (
          <CheckIcon width={size} height={size} />
        ) : (
          <XMarkIcon width={size} height={size} />
        )
      ) : (
        <PaperAirplaneIcon width={size} height={size} />
      )}
      {isSending ? 'Sending' : isSent ? prompt : 'Send Message'}
    </button>
  );
}
