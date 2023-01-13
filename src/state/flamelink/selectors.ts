import { createSelector } from "@reduxjs/toolkit";

import { RootState } from "../store";
import { initialState } from "./slice";
import {
  FlamelinkMeta,
  Question,
  PlansContent,
  VolumesContent,
  SessionsContent,
  PersonalDevotionsContent,
  AudiencesContent,
  FlamelinkImage,
} from "./types";
import { makeMediaUrl, MediaSize } from "./utils";

const getState = (state: RootState) => state.flamelink;

export const getFlamelinkData: (state: RootState) => FlamelinkMeta =
  createSelector(getState, (state) => state?.data || initialState.data);

export const getFlamelinkQuestions: (state: RootState) => Question[] =
  createSelector(
    getState,
    (state) => state?.questions || initialState.questions
  );

export const getFlamelinkImages: (state: RootState) => FlamelinkImage[] =
  createSelector(getState, (state) => state?.images || initialState.images);

export const getAudiences: (state: RootState) => AudiencesContent[] =
  createSelector(getFlamelinkData, (data) => data?.audiences || []);

export const getSortedAudiences: (state: RootState) => AudiencesContent[] =
  createSelector(getAudiences, (audiences) =>
    [...audiences].sort((a, b) => a.title.localeCompare(b.title))
  );

export const getPlans: (state: RootState) => PlansContent[] = createSelector(
  getFlamelinkData,
  (data) => data?.plans || []
);

export const getVolumes: (state: RootState) => VolumesContent[] =
  createSelector(getFlamelinkData, (data) => data?.volumes || []);

export const getSessions: (state: RootState) => SessionsContent[] =
  createSelector(getFlamelinkData, (data) => data?.sessions || []);

export const getDevotions: (state: RootState) => PersonalDevotionsContent[] =
  createSelector(getFlamelinkData, (data) => data?.personalDevotion || []);

export const getPlanById: (
  state: RootState,
  planId: string
) => PlansContent | undefined = createSelector(
  [getPlans, (_, props) => props],
  (plans, planId) => plans.find(({ id }) => id === planId)
);

export const getVolumeById: (
  state: RootState,
  planId: string
) => VolumesContent | undefined = createSelector(
  [getVolumes, (_, props) => props],
  (volumes, volumeId) => volumes.find(({ id }) => id === volumeId)
);

export const getSessionById: (
  state: RootState,
  planId: string
) => SessionsContent | undefined = createSelector(
  [getSessions, (_, props) => props],
  (sessions, sessionId) => sessions.find(({ id }) => id === sessionId)
);

export const getDevotionsById: (
  state: RootState,
  dayId: string
) => PersonalDevotionsContent | undefined = createSelector(
  [getDevotions, (_, props) => props],
  (devotions, dayId) => devotions.find(({ id }) => id === dayId)
);

export const getVolumesByPlanId: (
  state: RootState,
  planId: string
) => VolumesContent[] = createSelector(
  [getVolumes, getPlanById],
  (volumes, plan) =>
    volumes.filter(({ id }) => plan?.volumes.includes(id)) || []
);

export const getDevotionsBySessionId: (
  state: RootState,
  planId: string
) => PersonalDevotionsContent[] = createSelector(
  [getDevotions, getSessionById],
  (devotions = [], session) =>
    session?.days
      ?.map(
        (dayId) =>
          devotions.find(({ id }) => id === dayId) as PersonalDevotionsContent
      )
      .filter((item) => !!item) || []
);

export const getPlanDaysCount: (state: RootState, planId: string) => number =
  createSelector([getFlamelinkData, (_, props) => props], (data, planId) => {
    const volumes = data?.plans?.find(({ id }) => id === planId)?.volumes || [];

    const sessions = volumes?.reduce((acc: string[], volumeId: string) => {
      const volumeSessions =
        data?.volumes.find(({ id }) => id === volumeId)?.sessions || [];
      return [...acc, ...volumeSessions];
    }, []);

    return (
      sessions?.reduce((acc, sessionId) => {
        const sessionDays =
          data?.sessions.find(({ id }) => id === sessionId)?.days || [];
        return acc + Number(sessionDays?.length) || 0;
      }, 0) || 0
    );
  });

export const getSessionsDaysLength: (state: RootState) => {
  [sessionId: string]: number;
} = createSelector(getSessions, (sessions) =>
  sessions.reduce((acc, { id, days }) => {
    if (!id || !days) {
      return acc;
    }
    return {
      ...acc,
      [id]: days.length || 0,
    };
  }, {})
);

export const getPlanLogo = createSelector(
  [getFlamelinkImages, (_, planId) => planId],
  (flamelinkImages, planId) => {
    const logo = flamelinkImages.find((image) => image.planId === planId);

    return makeMediaUrl(logo?.logo ?? "", MediaSize.Medium);
  }
);

export const getPlanCover = createSelector(
  [getFlamelinkImages, (_, planId) => planId],
  (flamelinkImages, planId) => {
    const cover = flamelinkImages.find((image) => image.planId === planId);

    return makeMediaUrl(cover?.cover ?? "", MediaSize.Large);
  }
);

export const getPlanThumbnail = createSelector(
  [getFlamelinkImages, (_, planId) => planId],
  (flamelinkImages, planId) => {
    const thumbnail = flamelinkImages.find((image) => image.planId === planId);

    return makeMediaUrl(thumbnail?.cover ?? "", MediaSize.Medium);
  }
);
