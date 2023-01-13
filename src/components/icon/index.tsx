import React from "react";

import { colors, Colors } from "~/styles/theme";

import * as icons from "./icons";

export enum IconTypes {
  ActiveCarouselDot = "ActiveCarouselDot",
  ArrowDown = "ArrowDown",
  Bible = "Bible",
  CaretDown = "CaretDown",
  CarouselDot = "CarouselDot",
  Church = "Church",
  Close = "Close",
  EyeNotVisible = "EyeNotVisible",
  EyeOpen = "EyeOpen",
  Groups = "Groups",
  Home = "Home",
  Library = "Library",
  LogoApple = "LogoApple",
  LogoGoogle = "LogoGoogle",
  Notes = "Notes",
  Reverse = "Reverse",
  User = "User",
}

export enum IconSizes {
  XSmall = 10,
  Small = 16,
  SMedium = 20,
  Medium = 24,
  Large = 32,
  XLarge = 42,
  Logo = 52,
}

export type IconProps = {
  type: IconTypes;
  size?: IconSizes | number;
  color?: Colors;
  strokeWidth?: number;
};

export const Icon: React.FC<IconProps> = ({
  type,
  size = IconSizes.Medium,
  color = colors.black,
  ...props
}) => {
  const IconComponent = icons[type];

  return <IconComponent height={size} width={size} color={color} {...props} />;
};
