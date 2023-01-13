import * as React from "react";

import { Button } from "~/components/button";
import { ButtonTypes } from "~/components/button/types";
import { Camera } from "~/components/camera";
import { useCamera, ImageProps } from "~/utils/hooks/use-camera";
import { useAppSelector } from "~/state/hooks";
import { getProfileImage } from "~/state/user/selectors";

import { Container, ButtonWrapper, ButtonBox } from "../styles";
import { PhotoData } from "../types";
import { messages as generalMessages } from "../intl";
import { Content, ImageBox, ImagePreview, ImageIcon } from "./styles";
import { messages } from "./intl";

interface Props {
  onPress: (arg0: PhotoData) => void;
  onSubmit: () => void;
  onBackPress: () => void;
  image?: string;
}

export const PhotoInputs = React.memo<Props>(
  ({ onPress, onSubmit, onBackPress, image }) => {
    const statePhotoUrl = useAppSelector(getProfileImage);
    const [localImage, setLocalImage] = React.useState(image || statePhotoUrl);

    const handleImage = React.useCallback(
      ({ uri }: ImageProps) => {
        setLocalImage(uri);
        onPress({ image: uri });
      },
      [onPress]
    );

    const { onShowOptions, isModalVisible, handleCloseModal } = useCamera({
      handleImage,
    });

    return (
      <>
        <Container>
          <Content>
            <ImageBox onPress={onShowOptions}>
              {localImage ? (
                <ImagePreview source={{ uri: localImage }} />
              ) : (
                <ImageIcon />
              )}
            </ImageBox>

            <Button text={messages.buttonEdit} onPress={onShowOptions} />

            {isModalVisible ? (
              <Camera handlePicture={handleImage} onClose={handleCloseModal} />
            ) : null}
          </Content>
        </Container>

        <ButtonWrapper>
          <ButtonBox>
            <Button
              text={generalMessages.buttonPrevious}
              onPress={onBackPress}
              type={ButtonTypes.Outlined}
            />
          </ButtonBox>
          <ButtonBox isLast>
            <Button
              text={generalMessages.buttonNext}
              onPress={onSubmit}
              type={ButtonTypes.Primary}
            />
          </ButtonBox>
        </ButtonWrapper>
      </>
    );
  }
);
