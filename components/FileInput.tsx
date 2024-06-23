import handleFileUpload, { File } from '@/utils/handleFileUpload';
import { Input } from '@nextui-org/input';

export default function FileInput({
  onFileChange,
  isSending,
}: {
  onFileChange: (arg0: File | undefined) => void;
  isSending: boolean;
}) {
  return (
    <div className="flex items-center justify-center w-full">
      <label
        htmlFor="dropzone-file"
        className="flex flex-col items-center justify-center w-full border-2 border-dashed rounded-lg cursor-pointer"
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <svg
            className="w-8 h-8 mb-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 16"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
            />
          </svg>
          <p className="mb-2 text-sm">
            <span className="font-semibold">Click to upload</span> or drag and
            drop
          </p>
        </div>
        <input
          // isDisabled
          id="dropzone-file"
          type="file"
          onChange={async (e) => {
            const file = await handleFileUpload(e.target.files);
            onFileChange(file);
          }}
          className="hidden"
        />
      </label>
    </div>
  );
}
