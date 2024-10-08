import {
  MdAttachFile,
  MdImage,
  MdOutlineDescription,
  MdPictureAsPdf,
} from "react-icons/md";

interface IAssistedStep {
  id: string | number;
  number: number;
  name: string;
  description?: string;
}

interface IAssistedControls {
  goBackText?: string;
  goNextText?: string;
  submitText?: string;
}

const sizes = ["small", "large"] as const;
type IAssistedSize = (typeof sizes)[number];

const fileTypeIcons: { [key: string]: string[] } = {
  pdf: ["pdf"],
  image: ["jpg", "jpeg", "png", "gif", "bmp"],
  document: ["doc", "docx", "txt"],
  spreadsheet: ["xls", "xlsx", "csv"],
};

const iconMap: { [key: string]: JSX.Element } = {
  pdf: <MdPictureAsPdf />,
  image: <MdImage />,
  document: <MdOutlineDescription />,
  spreadsheet: <MdOutlineDescription />,
};

const defaultIcon = <MdAttachFile />;

interface IFile {
  id: string;
  file: File;
  loading: boolean;
}

const parameters = {
  docs: {
    descriptions: {
      component:
        "AttachArea allows users to upload, load, and save files with validation.",
    },
  },
};

const props = {
  maxFileSize: {
    description: "(number): The maximum allowed file size in MB for each file.",
    table: {
      defaultValue: { summary: 5 },
    },
  },
  onFilesChange: {
    description:
      "(Function): Called when files are selected or updated. The argument is an array of IFile objects.",
  },
  onFileLoad: {
    description:
      "(Function): Called when a file is loading. It should return a Promise<void> to simulate loading.",
  },
  onFileSave: {
    description:
      "(Function, optional): Called when a file is saved. It should return a Promise<void> to simulate saving.",
  },
};

export { parameters, props, sizes, iconMap, defaultIcon, fileTypeIcons };
export type { IFile, IAssistedStep, IAssistedControls, IAssistedSize };
