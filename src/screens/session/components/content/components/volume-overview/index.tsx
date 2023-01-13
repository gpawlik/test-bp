import * as React from "react";
import { messages } from "~/screens/session/intl";
import { VolumeOverview as VolumeOverviewType } from "~/state/flamelink/types";
import { SectionTitle } from "../common";
import { RichText } from "../rich-text";
import { Scripture } from "../scripture";
import { VolumeOverviewHeading } from "./styles";

interface VolumeOverviewProps {
  volumeOverview: VolumeOverviewType;
}

export const VolumeOverview: React.FC<VolumeOverviewProps> = ({
  volumeOverview,
}) => {
  if (!volumeOverview) return null;

  return (
    <>
      <VolumeOverviewHeading>{messages.volumeOverview}</VolumeOverviewHeading>

      {volumeOverview.title && (
        <SectionTitle>{volumeOverview.title}</SectionTitle>
      )}

      {volumeOverview.scripture && (
        <Scripture scripture={volumeOverview.scripture} />
      )}

      {volumeOverview.content && <RichText>{volumeOverview.content}</RichText>}
    </>
  );
};
