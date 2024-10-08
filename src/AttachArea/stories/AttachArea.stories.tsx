import { IAttachArea } from "..";
import { IFile, parameters, props } from "../props";
import { AttachAreaController } from "./AttachArea.controller";

const story = {
  title: "Inputs/AttachArea",
  component: AttachAreaController,
  parameters,
  argTypes: props,
};

const Default = (args: IAttachArea) => <AttachAreaController {...args} />;

Default.args = {
  maxFileSize: 5,
  onFilesChange: (files: IFile) => console.log("Selected files:", files),
};

export { Default };
export default story;
