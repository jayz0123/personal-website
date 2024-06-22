import handleFileUpload, { File } from '@/utils/handleFileUpload';

export default function MsgInput({
  onTextChange,
  onFileChange,
  isSending,
}: {
  onTextChange: (arg0: string) => void;
  onFileChange: (arg0: File | undefined) => void;
  isSending: boolean;
}) {
  return (
    <>
      <textarea
        name="message"
        aria-label="message input"
        className="flex-1 textarea textarea-bordered text-lg min-h-48"
        placeholder="Type your message here..."
        onChange={(e) => onTextChange(e.target.value)}
        disabled={isSending}
        required
      />
      <input
        type="file"
        aria-label="file input"
        className="file-input file-input-bordered"
        onChange={async (e) => {
          const file = await handleFileUpload(e.target.files);
          onFileChange(file);
        }}
        disabled={isSending}
      />
    </>
  );
}
