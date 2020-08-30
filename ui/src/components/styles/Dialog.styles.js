import styled from "styled-components";
import { TextField, IconButton } from "@material-ui/core";

export const StyledTextField = styled(TextField)`
  width: 100%;
`;

export const CloseButton = styled(IconButton)`
  && {
    position: absolute;
    right: 8px;
    top: 8px;
    color: #9e9e9e;
  }
`;
