import { IIcon } from "@inubekit/icon";
import { IText } from "@inubekit/text";
import { IButton } from "@inubekit/button";
import {
  MdDeleteOutline,
  MdErrorOutline,
  MdOutlineCloudUpload,
} from "react-icons/md";
import { Stack } from "@inubekit/stack";
import { Text } from "@inubekit/text";
import { Button } from "@inubekit/button";
import { Grid } from "@inubekit/grid";
import { Icon } from "@inubekit/icon";
import { Spinner } from "@inubekit/spinner";
import {
  StyledCard,
  StyledErrorContainer,
  StyledFileDrop,
  StyledInput,
} from "./styles";
import { Label } from "@inubekit/label";
import { IFile, defaultIcon, fileTypeIcons, iconMap } from "./props";
import { RefObject, useContext } from "react";
import { ThemeContext } from "styled-components";
import { tokens } from "./Tokens/tokens";

const getIconByFileType = (fileName: string) => {
  const extension = fileName.split(".").pop()?.toLowerCase();
  for (const [type, extensions] of Object.entries(fileTypeIcons)) {
    if (extensions.includes(extension!)) {
      return iconMap[type] || defaultIcon;
    }
  }
  return defaultIcon;
};

interface IAttachAreaUI {
  files: IFile[];
  isDragOver: boolean;
  isHovering: boolean;
  showError: boolean;
  maxFileSize: number;
  fileRef: RefObject<HTMLInputElement>;
  setIsHovering: (hover: boolean) => void;
  handleRemoveFile: (fileId: string) => void;
  handleSelectFiles: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleDragEnter: () => void;
  handleDragLeave: () => void;
  handleDragOver: (event: React.DragEvent<HTMLDivElement>) => void;
  handleDrop: (event: React.DragEvent<HTMLDivElement>) => void;
}

const AttachAreaUI = (props: IAttachAreaUI) => {
  const {
    files,
    isDragOver,
    isHovering,
    showError,
    maxFileSize,
    fileRef,
    setIsHovering,
    handleRemoveFile,
    handleSelectFiles,
    handleDragEnter,
    handleDragLeave,
    handleDragOver,
    handleDrop,
  } = props;

  const theme = useContext(ThemeContext) as { attachArea: typeof tokens };

  return (
    <Stack direction="column" gap="16px">
      <StyledFileDrop
        $isDragOver={isDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <Icon
          icon={<MdOutlineCloudUpload />}
          appearance={
            isHovering
              ? (theme?.attachArea?.icon?.appearance
                  ?.hover as IIcon["appearance"]) ||
                (tokens.icon.appearance.hover as IIcon["appearance"])
              : (theme?.attachArea?.icon?.appearance
                  ?.active as IIcon["appearance"]) ||
                (tokens.icon.appearance.active as IIcon["appearance"])
          }
          size="32px"
        />
        <Text
          type="body"
          size="large"
          textAlign="center"
          appearance={
            isHovering
              ? (theme?.attachArea?.text?.appearance
                  ?.hover as IText["appearance"]) ||
                (tokens.text.appearance.hover as IText["appearance"])
              : (theme?.attachArea?.text?.appearance
                  ?.active as IText["appearance"]) ||
                (tokens.text.appearance.active as IText["appearance"])
          }
        >
          Arrastra o suelta el archivo para subir <br /> o
        </Text>
        <StyledInput
          type="file"
          ref={fileRef}
          accept="image/*,application/pdf"
          onChange={handleSelectFiles}
          hidden
          multiple
        />
        <Button
          appearance={
            (theme?.attachArea?.button?.appearance as IButton["appearance"]) ||
            (tokens.button.appearance as IButton["appearance"])
          }
          onClick={() => fileRef.current?.click()}
          spacing="compact"
        >
          Elegir archivo
        </Button>
      </StyledFileDrop>

      <Text type="body" size="small" appearance="gray">
        Peso máximo por archivo: {maxFileSize}MB
      </Text>

      {files.length > 0 && (
        <Stack direction="column" gap="16px">
          <Text type="title" size="medium">
            Documentos adjuntos
          </Text>
          <Grid
            templateColumns="repeat(auto-fit, minmax(200px, 1fr))"
            autoRows="auto"
            gap="16px"
          >
            {files.map((file) => {
              const kilobytes = (file.file.size / 1024).toFixed(2);
              return (
                <StyledCard key={file.id}>
                  <Stack padding="16px" gap="8px" alignItems="center">
                    <Icon
                      icon={getIconByFileType(file.file.name)}
                      appearance={
                        (theme?.attachArea?.icon?.appearance
                          ?.active as IIcon["appearance"]) ||
                        (tokens.icon.appearance.active as IIcon["appearance"])
                      }
                      size="20px"
                    />
                    <Stack
                      justifyContent="space-between"
                      width="100%"
                      alignItems="center"
                    >
                      <Stack direction="column" gap="4px" width="100%">
                        <Text type="label" size="medium">
                          {file.file.name}
                        </Text>
                        <Text type="body" size="small" appearance="gray">
                          {kilobytes} KB
                        </Text>
                      </Stack>
                      {file.loading ? (
                        <Spinner
                          size="small"
                          appearance="primary"
                          transparent
                        />
                      ) : (
                        <Icon
                          icon={<MdDeleteOutline />}
                          appearance="danger"
                          size="20px"
                          onClick={() => handleRemoveFile(file.id)}
                        />
                      )}
                    </Stack>
                  </Stack>
                </StyledCard>
              );
            })}
          </Grid>
        </Stack>
      )}

      {showError && (
        <StyledErrorContainer>
          <Stack gap="8px">
            <Icon icon={<MdErrorOutline />} appearance="danger" size="20px" />
            <Label>
              El documento excede el límite de {maxFileSize}MB por archivo.
            </Label>
          </Stack>
        </StyledErrorContainer>
      )}
    </Stack>
  );
};

export { AttachAreaUI };
