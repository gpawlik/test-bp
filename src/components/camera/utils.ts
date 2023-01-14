import { Alert } from "react-native";
import { Platform } from "react-native";
import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
import { ImageInfo } from "expo-image-picker/build/ImagePicker.types";

import { formatMessage } from "~/utils/translation";
import { isWeb } from "~/utils/platform";

import { messages } from "./intl";
import { ANDROID_DEFAULT_RATIO } from "./constants";
import { Size } from "./types";

export const getCameraRatio = async (
  cameraRef: Camera | null,
  width: number,
  height: number
): Promise<string> => {
  if (Platform.OS !== "android" || !cameraRef) {
    return ANDROID_DEFAULT_RATIO;
  }

  const supportedRatios = await cameraRef.getSupportedRatiosAsync();

  const wantedRatio = height / width;

  const { ratio } = supportedRatios.reduce(
    ({ ratio: defaultRatio, error }, newRatio: string) => {
      const ratioElements = newRatio.split(":");
      const r0 = Number(ratioElements[0]);
      const r1 = Number(ratioElements[1]);
      const newError = Math.abs(wantedRatio - r0 / r1);

      if (newError < error) {
        return {
          ratio: newRatio,
          error: newError,
        };
      }

      return { ratio: defaultRatio, error };
    },
    { ratio: ANDROID_DEFAULT_RATIO, error: 100000 }
  ) as { ratio: string; error: number };

  return ratio;
};

const getCroppingParams = ({
  height,
  width,
}: {
  height: number;
  width: number;
}) => {
  return {
    originX: Math.max(0, (width - height) / 2),
    originY: Math.max(0, (height - width) / 2),
    width: Math.min(width, height),
    height: Math.min(width, height),
  };
};

type ProcessImageOptions = {
  image: ImageInfo;
  size: Size;
};

const processImage = async ({
  image,
  size: { width, height },
}: ProcessImageOptions) => {
  const processedImage = await ImageManipulator.manipulateAsync(
    image.uri,
    [
      {
        crop: getCroppingParams(image),
      },
      { resize: { width, height } },
    ],
    {
      compress: 0.7,
      format: ImageManipulator.SaveFormat.JPEG,
    }
  );

  return {
    ...processedImage,
    type: "image",
  };
};

export const pickFromLibrary = async () => {
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (status !== "granted") {
    await Alert.alert(
      formatMessage(messages.needPermissionsTitle),
      formatMessage(messages.needPermissionsBody)
    );
    return;
  }
  try {
    const result = (await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    })) as ImagePicker.ImagePickerResult & {
      uri: string;
      type: "image" | undefined;
    };

    const name = result.uri.split("/").pop() || "";

    return {
      ...result,
      name,
    };
  } catch (e) {
    return;
  }
};

export const pickAndProcessImage = async ({ size }: { size: Size }) => {
  try {
    const result = await pickFromLibrary();
    console.log({ result });

    if (result && !result.cancelled) {
      const resource = isWeb ? result?.assets[0] : result;
      const image = await processImage({ image: resource, size });

      return image;
    }
  } catch (e) {
    console.warn("Error picking a processing an image from Library", { e });
    return;
  }
};
