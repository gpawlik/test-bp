import React, { useRef, useState, useCallback } from "react";
import {
  Alert,
  Modal,
  LayoutChangeEvent,
  TouchableOpacity,
} from "react-native";
import {
  Camera as ExpoCamera,
  PermissionStatus,
  CameraType,
} from "expo-camera";

import { formatMessage } from "~/utils/translation";

import { ANDROID_DEFAULT_RATIO } from "./constants";
import {
  SafeArea,
  Container,
  ControlsContainer,
  Trigger,
  HeaderWrapper,
  CloseIcon,
  ReverseIcon,
} from "./styles";
import { getCameraRatio } from "./utils";
import { messages } from "./intl";

let resizeAttempts = 0;
const MAX_RESIZE_ATTEMPTS = 5;

const cameraTypes = {
  // @ts-ignore - investigate why TS does not recognise the enum
  front: ExpoCamera.Constants.Type.front,
  // @ts-ignore - investigate why TS does not recognise the enum
  back: ExpoCamera.Constants.Type.back,
};

type Props = {
  handlePicture: (picture: { uri: string }) => void;
  onClose: () => void;
};

export const Camera = React.memo<Props>(({ handlePicture, onClose }) => {
  const cameraRef = useRef<ExpoCamera>(null);

  const [unmountCamera, setUnmountCamera] = useState<boolean>(false);
  const [isCameraReady, setCameraReady] = useState<boolean>(false);
  const [cameraRatio, setCameraRatio] = useState<string>(ANDROID_DEFAULT_RATIO);
  const [cameraType, setCameraType] = useState<CameraType>(cameraTypes.back);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = useCallback(async () => {
    const { status: cameraStatus } =
      await ExpoCamera.requestCameraPermissionsAsync();

    if (cameraStatus === PermissionStatus.GRANTED) {
      setIsModalOpen(true);
      return;
    }

    Alert.alert(formatMessage(messages.picturePermissionAlert));
  }, [setIsModalOpen, handlePicture]);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    onClose();
  }, [setIsModalOpen]);

  const toggleCameraType = React.useCallback(() => {
    setUnmountCamera(true);

    if (cameraType === cameraTypes.back) {
      setCameraType(cameraTypes.front);
    }

    if (cameraType === cameraTypes.front) {
      setCameraType(cameraTypes.back);
    }

    setTimeout(() => {
      setUnmountCamera(false);
    }, 200);
  }, [cameraType, setCameraType]);

  const takePicture = useCallback(async () => {
    const picture = await cameraRef?.current
      ?.takePictureAsync({ quality: 0.3 })
      .catch((e) => console.warn(e));

    if (picture && handlePicture) {
      closeModal();
      handlePicture(picture);
    }
  }, [handlePicture, cameraRef, closeModal]);

  const calculateRatio = useCallback(async (width: number, height: number) => {
    try {
      const ratio = await getCameraRatio(cameraRef.current, width, height);

      setCameraRatio(ratio);
    } catch (e) {
      if (resizeAttempts < MAX_RESIZE_ATTEMPTS) {
        setTimeout(() => {
          resizeAttempts++;

          calculateRatio(width, height);
        }, 200);
      }
    }
  }, []);

  const onCameraReady = React.useCallback(() => {
    setCameraReady(true);
  }, [setCameraReady]);

  const onLayout = React.useCallback(
    async ({
      nativeEvent: {
        layout: { width, height },
      },
    }: LayoutChangeEvent) => {
      calculateRatio(width, height);
    },
    [calculateRatio]
  );

  React.useEffect(() => {
    openModal();
  }, []);

  return (
    <>
      <Modal animationType="fade" visible={isModalOpen}>
        <SafeArea>
          <Container onLayout={onLayout}>
            {unmountCamera ? null : (
              <ExpoCamera
                type={cameraType}
                style={{ flex: 1 }}
                ref={cameraRef}
                ratio={cameraRatio}
                onCameraReady={onCameraReady}
                useCamera2Api
                onMountError={(e) => console.warn(e)}
              />
            )}

            <HeaderWrapper>
              <TouchableOpacity onPress={closeModal}>
                <CloseIcon />
              </TouchableOpacity>
              {toggleCameraType ? (
                <TouchableOpacity
                  onPress={toggleCameraType}
                  disabled={unmountCamera}
                >
                  <ReverseIcon />
                </TouchableOpacity>
              ) : null}
            </HeaderWrapper>

            {isCameraReady ? (
              <ControlsContainer>
                <Trigger onPress={takePicture} />
              </ControlsContainer>
            ) : null}
          </Container>
        </SafeArea>
      </Modal>
    </>
  );
});
