import { UserIcon } from '@heroicons/react/24/solid';

export default function NameInput({
  textSize = 24,
  onTextChange,
  isSending,
}: {
  textSize?: number;
  onTextChange: (arg0: string) => void;
  isSending: boolean;
}) {
  return (
    <label
      className="input input-bordered text-lg flex items-center gap-2 flex-none"
      aria-label="name input"
    >
      <UserIcon width={textSize} height={textSize} />
      <input
        type="text"
        className="grow"
        placeholder="Your name"
        onChange={(e) => onTextChange(e.target.value)}
        disabled={isSending}
      />
    </label>
  );
}
