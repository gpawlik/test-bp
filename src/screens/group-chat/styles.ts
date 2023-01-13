import styled from "styled-components/native";

import { spacers, colors } from "~/styles/theme";

export const Container = styled.View`
  background-color: ${colors.warmGray100};
  padding-bottom: ${spacers.ss9};
  flex: 1;
`;

export const Content = styled.KeyboardAvoidingView`
  flex: 1;
`;

export const ChatContent = styled.ScrollView.attrs({
  contentContainerStyle: {
    flexGrow: 1,
    justifyContent: "flex-end",
  },
})`
  flex: 1;
  padding-horizontal: ${spacers.ss6};
`;
