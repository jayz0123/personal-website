export interface File {
  name: string;
  content: string;
}

export default function handleFileUpload(
  files: FileList | null,
): Promise<File | undefined> {
  return new Promise((resolve, reject) => {
    if (!files || files.length === 0) {
      resolve(undefined);
      return;
    }

    const reader = new FileReader();
    reader.onload = (r: ProgressEvent<FileReader>) => {
      if (r.target && r.target.result) {
        const file: File = {
          name: files[0].name,
          content: r.target.result.toString(),
        };
        resolve(file);
      } else {
        resolve(undefined);
      }
    };
    reader.onerror = () => {
      reject(new Error('Failed to load file'));
    };
    reader.readAsDataURL(files[0]);
  });
}
