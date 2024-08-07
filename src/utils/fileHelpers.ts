import type { CustomFile } from '@/lib/definitions';

export function convertBase64ToBuffer(content: string): Buffer {
  return Buffer.from(content.split(',')[1], 'base64');
}

export function readFiles(
  fileList: FileList,
  callback?: any,
  readAs: 'text' | 'dataURL' = 'dataURL',
): CustomFile[] {
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

        if (callback) callback(handledFile);
      }
    };

    reader.onerror = () => {
      console.error('Failed to load file');
    };

    if (readAs === 'text') {
      reader.readAsText(file);
    } else {
      reader.readAsDataURL(file);
    }
  }

  return handledFiles;
}
