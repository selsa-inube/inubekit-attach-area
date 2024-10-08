import styled from "styled-components";
import { tokens } from "./Tokens/tokens";
import { inube } from "@inubekit/foundations";

const StyledCard = styled.div`
  background: ${({ theme }) =>
    theme?.attachArea?.background?.card || tokens.background.color.active};
  border: 1px solid
    ${({ theme }) =>
      theme?.attachArea?.border?.color?.card || tokens.border.color.active};
  border-radius: 8px;
  height: fit-content;
`;

const StyledInfoCard = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
  background-color: ${({ theme }) =>
    theme?.attachArea?.background?.info || tokens.background.color.hover};
  border-radius: 4px;
`;

const StyledFileDrop = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 2px dashed
    ${({ theme, $isDragOver }) =>
      $isDragOver
        ? theme?.attachArea?.border?.color?.hover || tokens.border.color.hover
        : theme?.attachArea?.border?.color?.active ||
          tokens.border.color.active};
  border-radius: 8px;
  padding: 24px;
  gap: 16px;
  transition: border-color 0.3s ease;
  user-select: none;
  background-color: ${({ theme, $isDragOver }) =>
    $isDragOver
      ? theme?.attachArea?.background?.color?.hover ||
        tokens.background.color.hover
      : theme?.attachArea?.background?.color?.active ||
        tokens.background.color.active};
  &:hover {
    background-color: ${({ theme }) =>
      theme?.attachArea?.background?.color?.hover ||
      tokens.background.color.hover};
    border-color: ${({ theme }) =>
      theme?.attachArea?.border?.color?.hover || tokens.border.color.hover};
  }
`;

const StyledInput = styled.input``;

const StyledErrorContainer = styled.div`
  background-color: ${({ theme }) =>
    theme?.palette?.red?.R50 || inube.palette.red.R50};
  border-radius: 4px;
  padding: 16px;
`;

export {
  StyledCard,
  StyledErrorContainer,
  StyledInput,
  StyledInfoCard,
  StyledFileDrop,
};
