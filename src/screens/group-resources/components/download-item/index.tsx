import * as React from "react";
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";

import { IconSizes } from "~/components/icon";
import { colors } from "~/styles/theme";

import { Container, Content, Title } from "./styles";

interface Props {
  type: string;
  title: TextType;
  isDownloaded: boolean;
  isLast?: boolean;
}

const getIcon = (type: string) => {
  switch (type) {
    case "video":
      return "play-circle-outline";
    case "image":
      return "image-outline";
    default:
      return "text-box-outline";
  }
};

export const DownloadItem = React.memo<Props>(
  ({ type, title, isDownloaded, isLast }) => {
    const icon = getIcon(type);
    return (
      <Container isLast={isLast}>
        <Icon name={icon} size={IconSizes.Small} color={colors.gray500} />

        <Content>
          <Title>{title}</Title>
        </Content>

        <Icon
          name={isDownloaded ? "check-underline" : "download"}
          size={IconSizes.Small}
          color={colors.gray700}
        />
      </Container>
    );
  }
);
