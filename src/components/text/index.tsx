import * as React from "react";
import styled from "styled-components/native";

import { colors, Colors, fontSizes } from "../../styles/theme";
import type { MessageDescriptorValues } from "../../types/messages";
import { formatMessage, isIntlDescriptor } from "../../utils/translation";

type Sizes = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
type Aligns = "center" | "right" | "left" | "justify";

type BaseTextProps = {
  size: Sizes;
  color: Colors;
  align: Aligns;
  family: string;
  underline?: boolean;
  selectable?: boolean;
  numberOfLines?: number;
};

const BaseText = styled.Text<BaseTextProps>`
  color: ${({ color }) => color};
  font-size: ${({ size }) => fontSizes[`fs${size}` as keyof typeof fontSizes]};
  font-family: ${({ family }) => family};
  text-align: ${({ align }) => align};
  text-decoration: ${({ underline }) => (underline ? "underline" : null)};
  text-decoration-color: ${({ color }) => color};
`;

type Props = {
  children: TextType;
} & Partial<BaseTextProps>;

export const TextComponent: React.FC<Props> = ({
  children,
  size = 1,
  family = "SFPro",
  color = colors.black,
  align = "left",
  ...props
}) => {
  const text = isIntlDescriptor(children)
    ? formatMessage(children as MessageDescriptorValues)
    : (children as string);

  return (
    <BaseText
      size={size}
      color={color}
      align={align}
      family={family}
      allowFontScaling={false}
      {...props}
    >
      {text}
    </BaseText>
  );
};

type TextProps = {
  children: TextType;
  color?: Colors;
  underline?: boolean;
  numberOfLines?: number;
  onPress?: () => void;
};

// ===== REGULAR ======
// Text Regular
export const Text0: React.FC<TextProps> = ({ children, ...props }) => (
  <TextComponent size={0} {...props}>
    {children}
  </TextComponent>
);
export const Text1: React.FC<TextProps> = ({ children, ...props }) => (
  <TextComponent {...props}>{children}</TextComponent>
);
export const Text2: React.FC<TextProps> = ({ children, ...props }) => (
  <TextComponent size={2} {...props}>
    {children}
  </TextComponent>
);
export const Text3: React.FC<TextProps> = ({ children, ...props }) => (
  <TextComponent size={3} {...props}>
    {children}
  </TextComponent>
);
export const Text4: React.FC<TextProps> = ({ children, ...props }) => (
  <TextComponent size={4} {...props}>
    {children}
  </TextComponent>
);
export const Text5: React.FC<TextProps> = ({ children, ...props }) => (
  <TextComponent size={5} {...props}>
    {children}
  </TextComponent>
);
export const Text6: React.FC<TextProps> = ({ children, ...props }) => (
  <TextComponent size={6} {...props}>
    {children}
  </TextComponent>
);
export const Text7: React.FC<TextProps> = ({ children, ...props }) => (
  <TextComponent size={7} {...props}>
    {children}
  </TextComponent>
);
export const Text8: React.FC<TextProps> = ({ children, ...props }) => (
  <TextComponent size={8} {...props}>
    {children}
  </TextComponent>
);
export const Text9: React.FC<TextProps> = ({ children, ...props }) => (
  <TextComponent size={9} {...props}>
    {children}
  </TextComponent>
);
export const Text10: React.FC<TextProps> = ({ children, ...props }) => (
  <TextComponent size={10} {...props}>
    {children}
  </TextComponent>
);

// Text Regular Center
export const Text0Center: React.FC<TextProps> = ({ children, ...props }) => (
  <TextComponent size={0} align="center" {...props}>
    {children}
  </TextComponent>
);
export const Text1Center: React.FC<TextProps> = ({ children, ...props }) => (
  <TextComponent align="center" {...props}>
    {children}
  </TextComponent>
);
export const Text2Center: React.FC<TextProps> = ({ children, ...props }) => (
  <TextComponent size={2} align="center" {...props}>
    {children}
  </TextComponent>
);
export const Text3Center: React.FC<TextProps> = ({ children, ...props }) => (
  <TextComponent size={3} align="center" {...props}>
    {children}
  </TextComponent>
);
export const Text4Center: React.FC<TextProps> = ({ children, ...props }) => (
  <TextComponent size={4} align="center" {...props}>
    {children}
  </TextComponent>
);
export const Text5Center: React.FC<TextProps> = ({ children, ...props }) => (
  <TextComponent size={5} align="center" {...props}>
    {children}
  </TextComponent>
);
export const Text6Center: React.FC<TextProps> = ({ children, ...props }) => (
  <TextComponent size={6} align="center" {...props}>
    {children}
  </TextComponent>
);
export const Text7Center: React.FC<TextProps> = ({ children, ...props }) => (
  <TextComponent size={7} align="center" {...props}>
    {children}
  </TextComponent>
);
export const Text8Center: React.FC<TextProps> = ({ children, ...props }) => (
  <TextComponent size={8} align="center" {...props}>
    {children}
  </TextComponent>
);
export const Text9Center: React.FC<TextProps> = ({ children, ...props }) => (
  <TextComponent size={9} align="center" {...props}>
    {children}
  </TextComponent>
);
export const Text10Center: React.FC<TextProps> = ({ children, ...props }) => (
  <TextComponent size={10} align="center" {...props}>
    {children}
  </TextComponent>
);

// Text Regular Right
export const Text0Right: React.FC<TextProps> = ({ children, ...props }) => (
  <TextComponent size={0} align="right" {...props}>
    {children}
  </TextComponent>
);
export const Text1Right: React.FC<TextProps> = ({ children, ...props }) => (
  <TextComponent align="right" {...props}>
    {children}
  </TextComponent>
);
export const Text2Right: React.FC<TextProps> = ({ children, ...props }) => (
  <TextComponent size={2} align="right" {...props}>
    {children}
  </TextComponent>
);
export const Text3Right: React.FC<TextProps> = ({ children, ...props }) => (
  <TextComponent size={3} align="right" {...props}>
    {children}
  </TextComponent>
);
export const Text4Right: React.FC<TextProps> = ({ children, ...props }) => (
  <TextComponent size={4} align="right" {...props}>
    {children}
  </TextComponent>
);
export const Text5Right: React.FC<TextProps> = ({ children, ...props }) => (
  <TextComponent size={5} align="right" {...props}>
    {children}
  </TextComponent>
);
export const Text6Right: React.FC<TextProps> = ({ children, ...props }) => (
  <TextComponent size={6} align="right" {...props}>
    {children}
  </TextComponent>
);
export const Text7Right: React.FC<TextProps> = ({ children, ...props }) => (
  <TextComponent size={7} align="right" {...props}>
    {children}
  </TextComponent>
);
export const Text8Right: React.FC<TextProps> = ({ children, ...props }) => (
  <TextComponent size={8} align="right" {...props}>
    {children}
  </TextComponent>
);
export const Text9Right: React.FC<TextProps> = ({ children, ...props }) => (
  <TextComponent size={9} align="right" {...props}>
    {children}
  </TextComponent>
);
export const Text10Right: React.FC<TextProps> = ({ children, ...props }) => (
  <TextComponent size={10} align="right" {...props}>
    {children}
  </TextComponent>
);
