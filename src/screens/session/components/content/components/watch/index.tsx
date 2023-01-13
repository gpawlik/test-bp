import * as React from "react";
import { TouchableOpacity } from "react-native";
import { ResizeMode, Video } from "expo-av";
import { MaterialIcons } from "@expo/vector-icons";
import type { WatchSection } from "~/state/flamelink/types";
import { isWeb } from "~/utils/platform";
import { IconSizes } from "~/components/icon";
import { colors } from "~/styles/theme";
import { VideoContainer, VideoMask, videoStyles } from "./styles";
import { RichText } from "../rich-text";
import { Question } from "../question";
import { SectionTitle } from "../common";

interface WatchProps {
  watch: WatchSection;
}

export const Watch: React.FC<WatchProps> = ({ watch }) => {
  const video = React.useRef<Video>(null);
  const [maskVisible, setMaskVisible] = React.useState(true);

  const videoUrl = watch.video[0]?.url;

  React.useEffect(() => {
    videoUrl && video.current?.loadAsync({ uri: videoUrl });
  }, [videoUrl]);

  const onPlay = React.useCallback(() => {
    setMaskVisible(false);

    video.current?.playAsync();
  }, []);

  return (
    <>
      <SectionTitle>{watch?.sectionTitle}</SectionTitle>

      <RichText>{watch?.intro}</RichText>

      {videoUrl && (
        <VideoContainer>
          {isWeb ? (
            <video style={videoStyles} controls>
              <source src={videoUrl} type="video/mp4" />
            </video>
          ) : (
            <>
              <Video
                ref={video}
                source={{ uri: videoUrl }}
                style={videoStyles}
                resizeMode={ResizeMode.CONTAIN}
                shouldPlay={false}
                useNativeControls
                isLooping={true}
                usePoster
                rate={1.0}
                volume={1.0}
                isMuted={false}
              />

              {maskVisible && (
                <VideoMask>
                  <TouchableOpacity onPress={onPlay}>
                    <MaterialIcons
                      name="play-circle-fill"
                      size={IconSizes.XLarge}
                      color={colors.white}
                    />
                  </TouchableOpacity>
                </VideoMask>
              )}
            </>
          )}
        </VideoContainer>
      )}

      <>
        {watch.questions.map((question) => (
          <Question question={question} key={question.uniqueKey} />
        ))}
      </>
    </>
  );
};
