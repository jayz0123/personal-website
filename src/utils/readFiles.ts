interface IFile {
  fileName: string;
  fileType: string;
  content: string;
}

export default function readFiles(fileList: FileList, append?: any) {
  const files = Array.from(fileList);
  const handledFiles: IFile[] = [];

  files.forEach((file: File) => {
    const reader = new FileReader();
    reader.onload = (r: ProgressEvent<FileReader>) => {
      if (r.target && r.target.result) {
        const handledFile: IFile = {
          fileName: file.name,
          fileType: file.type,
          content: r.target.result.toString(),
        };
        append(handledFile);
      }
    };

    reader.onerror = () => {
      console.error('Failed to load file');
    };

    reader.readAsDataURL(file);
  });

  return handledFiles;
}
