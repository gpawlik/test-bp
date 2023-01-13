import styled from "styled-components/native";

import { Text2, Text3, Text5 } from "~/components/text";
import { spacers, colors } from "~/styles/theme";

export const Screen = styled.View`
  flex: 1;
  background-color: ${colors.white};
`;

export const Container = styled.View`
  padding-horizontal: ${spacers.ss6};
  padding-top: ${spacers.ss6};
`;

export const HeaderBox = styled.View`
  margin-top: ${spacers.ss3};
  margin-bottom: ${spacers.ss7};
`;

export const TitleBox = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Title = styled(Text5)`
  font-family: MontserratMedium;
  margin-bottom: ${spacers.ss3};
  flex: 1;
`;

export const MoreButton = styled.TouchableOpacity`
  padding: ${spacers.ss4};
`;

export const LastEdited = styled(Text2)`
  color: ${colors.gray500};
`;

export const Section = styled.View`
  margin-bottom: ${spacers.ss7};
`;

export const QuestionBox = styled.View`
  background-color: ${colors.gray100};
  padding: ${spacers.ss5} ${spacers.ss6};
  margin-bottom: ${spacers.ss5};
  border-radius: 12px;
`;

export const Prefix = styled(Text3)`
  font-family: SFProDisplayBold;
`;

export const Question = styled(Text3)``;

export const Answer = styled(Text3)``;
