import * as React from "react";
import Icon from "@expo/vector-icons/MaterialIcons";

import { GroupAvatar } from "~/components/group-avatar";
import { AvatarSize } from "~/components/group-avatar/types";
import { Camera } from "~/components/camera";

import { useCamera, ImageProps } from "~/utils/hooks/use-camera";

import { Container, CameraBox } from "./styles";

const size = {
  width: 250,
  height: 250,
};

interface Props {
  groupName: string;
  isDisabled?: boolean;
}

export const ChangeImage = React.memo<Props>(({ groupName, isDisabled }) => {
  const [localImage, setLocalImage] = React.useState("");

  const handleImage = React.useCallback(({ uri }: ImageProps) => {
    setLocalImage(uri);
  }, []);

  const { onShowOptions, isModalVisible, handleCloseModal } = useCamera({
    size,
    handleImage,
  });

  const onPress = React.useCallback(() => {
    if (isDisabled) {
      return;
    }
    onShowOptions();
  }, [onShowOptions, isDisabled]);

  return (
    <>
      <Container onPress={onPress}>
        <GroupAvatar
          text={groupName || "Group 1"}
          size={AvatarSize.Large}
          uri={localImage}
        />
        <CameraBox>
          <Icon name="camera-alt" />
        </CameraBox>
      </Container>
      {isModalVisible ? (
        <Camera handlePicture={handleImage} onClose={handleCloseModal} />
      ) : null}
    </>
  );
});
