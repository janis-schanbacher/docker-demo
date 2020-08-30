import styled from "styled-components";
import { Card, Typography } from "@material-ui/core";

export const StyledCard = styled(Card)`
  margin: 10px;
  width: 560px;
  padding: 5px;
`;

export const ListHeader = styled.div`
  width: 100%;
  display: inline-flex;
  margin-bottom: 2px;
  flex: 0 0 auto;
  padding: 7px 0 5px 0;
  min-height: 22px;
  position: relative;
  border-bottom: 2px solid rgba(0, 0, 0, 0.08);
`;

export const ListTitle = styled(Typography)`
  width: 100%;
`;
