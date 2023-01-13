import { Tuple } from "~/types/utils";

export interface VolumeOverview {
  heading: string;
  title: string;
  content: string;
  scripture: string;
}

export interface Question {
  question: string;
  uniqueKey: string;
}

export interface WatchSectionVideo {
  file: string;
  id: string;
  url: string;
}

export interface WatchSection {
  intro: string;
  questions: Question[];
  sectionTitle: string;
  video: Tuple<WatchSectionVideo, 1>;
}

export interface ConsiderSectionSubsectionRepearer {
  title: string;
  intro: string;
  scripture: string;
  body: string;
  questionRepeater: Question[];
}

export interface ConsiderSection {
  intro: string;
  sectionTitle: string;
  subsectionRepeater: ConsiderSectionSubsectionRepearer[];
}

export interface ReflectSection {
  sectionTitle: string;
  content: string;
}

export interface EngageSectionContentRepeater {
  content: string;
  question: string;
  uniqueKey: string;
}

export interface EngageSection {
  sectionTitle: string;
  contentRepeater: EngageSectionContentRepeater[];
}

export interface ListenToGodSection {
  sectionTitle: string;
  intro: string;
  personalReflectionQuestions: {
    sectionTitle: string;
    intro: string;
    questionRepeater: Question[];
  };
  prayerRequests: {
    sectionTitle: string;
    content: string;
    intro: string;
  };
  activate: {
    content: string;
    sectionTitle: string;
    question: string;
  };
}

export interface FlamelinkMedia {
  id: string;
  contentType: string;
  file: string;
  type: string;
  url: string;
}

export interface Day {
  id: string;
  title: string;
  content: string;
  scripture: string;
  questions: Question[];
}

export enum SectionOrder {
  VolumeOverview = "volumeOverview",
  Watch = "watch",
  Consider = "consider",
  Engage = "engage",
  ListenToGod = "listenToGod",
  Reflect = "reflect",
}

export interface Session {
  id: string;
  title: string;
  days: string[];
  volumeOverview: VolumeOverview;
  watch: WatchSection;
  sectionOrder: Array<SectionOrder>;
  consider: ConsiderSection;
  reflect: ReflectSection;
  engage: EngageSection;
  listenToGod: ListenToGodSection;
}

export interface Volume {
  id: string;
  title: string;
  sessions: Session[];
}

export interface Plan {
  id: string;
  planTitle: string;
  volumes: Volume[];
  cover: Tuple<FlamelinkMedia, 1>;
  logo: Tuple<FlamelinkMedia, 1>;
}

export type Filters = Array<[string, string, string] | []>;

export interface FlamelinkBaseQueryParams {
  schemaKey: string;
  filters?: Filters;
  equalTo?: string;
  populate?: boolean;
  fields?: Array<string>;
}

export type Content = {
  order: number;
  id: string;
  title: string;
};

export type AudiencesContent = Content & {
  plans: string[];
};

export type PlansContent = Content & {
  volumes: string[];
  cover: string[];
  logo: string[];
};

export type VolumesContent = Content & {
  sessions: string[];
};

export type SessionsContent = Content & {
  days: string[];
  volumeHeading: string;
};

export type PersonalDevotionsContent = Content & {
  questions: Question[];
  disclaimer: string;
  content: string;
  scripture: string;
  heading: string;
};

export interface FlamelinkMeta {
  audiences: AudiencesContent[];
  plans: PlansContent[];
  sessions: SessionsContent[];
  volumes: VolumesContent[];
  personalDevotion: PersonalDevotionsContent[];
}

export interface FlamelinkImage {
  planId: string;
  cover?: string;
  logo?: string;
}

export interface FlamelinkMediaFile {
  id: string;
  file: string;
}

export interface FlamelinkState {
  data: FlamelinkMeta | {};
  questions?: Question[];
  images?: FlamelinkImage[];
}

export interface SessionData {
  data: Session;
}
