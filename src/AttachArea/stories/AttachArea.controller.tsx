import { useState } from "react";
import { AttachArea, IAttachArea } from "..";
import { IFile } from "../props";

const AttachAreaController = (props: IAttachArea) => {
  const { maxFileSize, onFilesChange } = props;
  const [, setFiles] = useState<IFile[]>([]);

  const simulateFileUpload = (selectedFiles: IFile[]) => {
    const updatedFiles = selectedFiles.map((file) => ({
      ...file,
      loading: true,
    }));
    setFiles(updatedFiles);
    onFilesChange(updatedFiles);

    setTimeout(() => {
      const processedFiles = updatedFiles.map((file) => ({
        ...file,
        loading: false,
      }));
      setFiles(processedFiles);
      onFilesChange(processedFiles);
    }, 1000);
  };

  const onFileLoad = (): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(), 1000);
    });
  };

  return (
    <AttachArea
      maxFileSize={maxFileSize}
      onFilesChange={simulateFileUpload}
      onFileLoad={onFileLoad}
    />
  );
};

export { AttachAreaController };
