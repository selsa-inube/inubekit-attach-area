import { useState, useRef } from "react";
import { IFile } from "./props";

import { AttachAreaUI } from "./interface";

interface IAttachArea {
  maxFileSize: number;
  onFilesChange: (files: IFile[]) => void;
  onFileLoad: (file: IFile) => Promise<void>;
  onFileSave?: (file: IFile) => Promise<void>;
}

const AttachArea = (props: IAttachArea) => {
  const { maxFileSize, onFilesChange, onFileLoad, onFileSave } = props;
  const [files, setFiles] = useState<IFile[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [showError, setShowError] = useState<boolean>(false);
  const [isHovering, setIsHovering] = useState(false);
  const fileRef = useRef<HTMLInputElement | null>(null);

  const handleFileSelect = async (selectedFiles: FileList) => {
    const validFiles = [...selectedFiles].filter(
      (file) => file.size <= maxFileSize * 1024 * 1024,
    );

    if (validFiles.length < selectedFiles.length) {
      setShowError(true);
    } else {
      setShowError(false);
      const newFiles: IFile[] = validFiles.map((file) => ({
        id: file.name,
        file,
        loading: true,
      }));

      setFiles((prevFiles) => [...prevFiles, ...newFiles]);
      onFilesChange([...files, ...newFiles]);

      newFiles.forEach(async (file) => {
        await onFileLoad(file);
        setFiles((prevFiles) =>
          prevFiles.map((f) =>
            f.id === file.id ? { ...f, loading: false } : f,
          ),
        );

        if (onFileSave) {
          await onFileSave(file);
        }
      });
    }
  };

  const handleRemoveFile = (fileId: string) => {
    const updatedFiles = files.filter((file) => file.id !== fileId);
    setFiles(updatedFiles);
    onFilesChange(updatedFiles);
  };

  const handleSelectFiles = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (selectedFiles) handleFileSelect(selectedFiles);
    if (fileRef.current) {
      fileRef.current.value = "";
    }
  };

  const handleDragEnter = () => setIsDragOver(true);
  const handleDragLeave = () => setIsDragOver(false);

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragOver(true);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragOver(false);
    const droppedFiles = event.dataTransfer.files;
    if (droppedFiles) handleFileSelect(droppedFiles);
  };

  return (
    <AttachAreaUI
      files={files}
      isDragOver={isDragOver}
      isHovering={isHovering}
      showError={showError}
      maxFileSize={maxFileSize}
      fileRef={fileRef}
      setIsHovering={setIsHovering}
      handleRemoveFile={handleRemoveFile}
      handleSelectFiles={handleSelectFiles}
      handleDragEnter={handleDragEnter}
      handleDragLeave={handleDragLeave}
      handleDragOver={handleDragOver}
      handleDrop={handleDrop}
    />
  );
};

export { AttachArea };
export type { IAttachArea };
