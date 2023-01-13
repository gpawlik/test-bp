import styled, { css } from "styled-components/native";

import { Icon, IconTypes } from "~/components/icon";
import { colors, spacers } from "~/styles/theme";

const iconStyle = css`
  color: ${colors.white};
  width: 24px;
  height: 24px;
`;

const overlayStyle = css`
  position: absolute;
  z-index: 999;
  width: 100%;
  background-color: ${colors.black};
`;

export const SafeArea = styled.SafeAreaView`
  flex: 1;
  height: 100%;
  width: 100%;
  background-color: ${colors.white};
`;

export const Container = styled.SafeAreaView`
  flex: 1;
  position: relative;
`;

export const HeaderWrapper = styled.View`
  ${overlayStyle};
  top: 0;
  padding-vertical: ${spacers.ss8};
  padding-horizontal: ${spacers.ss8};
  flex-direction: row;
  justify-content: space-between;
`;

export const CloseIcon = styled(Icon).attrs({
  type: IconTypes.Close,
})`
  ${iconStyle}
`;

export const ReverseIcon = styled(Icon).attrs({
  type: IconTypes.Reverse,
})`
  ${iconStyle};
  margin-right: ${spacers.ss4};
`;

export const ControlsContainer = styled.View`
  ${overlayStyle};
  bottom: 0;
  padding-vertical: ${spacers.ss9};
  align-items: center;
  justify-content: center;
`;

export const Trigger = styled.TouchableOpacity`
  border-radius: 30px;
  height: 60px;
  width: 60px;
  background-color: ${colors.white};
  border-color: ${colors.white};
  border-width: 1px;
  opacity: 0.8;
  align-items: center;
  justify-content: center;
`;

export const PreviewImage = styled.Image`
  flex: 1;
`;
