import styled from "styled-components/native";

import { Text8 } from "~/components/text";
import { spacers, colors } from "~/styles/theme";

export const Screen = styled.View`
  flex: 1;
`;

export const Container = styled.View`
  padding-horizontal: ${spacers.ss6};
  padding-top: ${spacers.ss6};
`;

export const TitleBox = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${spacers.ss8};
`;

export const Title = styled(Text8)``;

export const MoreButton = styled.TouchableOpacity`
  padding: ${spacers.ss4};
`;

export const SearchBox = styled.View`
  margin-bottom: ${spacers.ss6};
`;

export const Dot = styled.View`
  position: absolute;
  top: 12px;
  right: 10px;
  width: 6px;
  height: 6px;
  border-radius: 3px;
  background-color: ${colors.red500};
`;
