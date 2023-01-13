import * as React from "react";
import { useActionSheet } from "@expo/react-native-action-sheet";

import { formatMessage } from "~/utils/translation";
import { pickAndProcessImage } from "~/components/camera/utils";

import { messages } from "./intl";

const IMAGE_SIZE = {
  width: 500,
  height: 500,
};

type Size = {
  width: number;
  height: number;
};

export type ImageProps = {
  uri: string;
};

interface Props {
  handleImage: (arg0: ImageProps) => void;
  size?: Size;
}

export const useCamera = ({ handleImage, size = IMAGE_SIZE }: Props) => {
  const [isModalVisible, setIsModalVisible] = React.useState(false);

  const { showActionSheetWithOptions } = useActionSheet();

  const translatedOptions = [
    messages.buttonPhoto,
    messages.buttonLibrary,
    messages.buttonCancel,
  ].map((message) => formatMessage(message));

  const handleOpenLibrary = React.useCallback(async () => {
    const mediaFile = await pickAndProcessImage({ size });

    if (!mediaFile) {
      return;
    }

    handleImage({ uri: mediaFile.uri });
  }, [handleImage, size]);

  const handleCloseModal = React.useCallback(
    () => setIsModalVisible(false),
    [setIsModalVisible]
  );

  const onShowOptions = () => {
    showActionSheetWithOptions(
      {
        options: translatedOptions,
        cancelButtonIndex: 2,
      },
      (selectedIndex?: number) => {
        switch (selectedIndex) {
          case 0:
            return setIsModalVisible(true);
          case 1:
            return handleOpenLibrary();
          default:
            return;
        }
      }
    );
  };

  return {
    onShowOptions,
    isModalVisible,
    handleCloseModal,
  };
};
