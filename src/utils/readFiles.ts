import type { CustomFile } from '@/lib/definitions';

export default function readFiles(fileList: FileList, append?: any) {
  const files = Array.from(fileList);
  const handledFiles: CustomFile[] = [];

  for (const file of files) {
    const reader = new FileReader();
    reader.onload = (r: ProgressEvent<FileReader>) => {
      if (r.target && r.target.result) {
        const handledFile: CustomFile = {
          fileName: file.name,
          fileType: file.type,
          content: r.target.result.toString(),
        };

        if (append) append(handledFile);
      }
    };

    reader.onerror = () => {
      console.error('Failed to load file');
    };

    reader.readAsDataURL(file);
  }

  return handledFiles;
}
