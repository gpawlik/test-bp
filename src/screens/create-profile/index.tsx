import * as React from "react";

import { AuthScreen } from "~/components/auth-screen";
import { Steps } from "~/components/steps";
import { useAppDispatch } from "~/state/hooks";
import { saveProfile } from "~/state/user/actions";

import { BasicInputs } from "./components/basic-inputs";
import { TypeInputs } from "./components/type-inputs";
import { PhotoInputs } from "./components/photo-inputs";
import { ChurchInputs } from "./components/church-inputs";
import { messages } from "./intl";
import {
  ProfileData,
  BasicData,
  PhotoData,
  TypeData,
  ChurchData,
} from "./types";

export const CreateProfile = () => {
  const [data, setData] = React.useState({});
  const [step, setStep] = React.useState(0);

  const [isLoading, setIsLoading] = React.useState(false);
  const dispatch = useAppDispatch();

  const handleCreateProfile = React.useCallback(
    (allData: ProfileData) => {
      setIsLoading(true);

      dispatch(
        saveProfile({
          ...allData,
          onSuccess: () => setIsLoading(false),
          onError: () => setIsLoading(false),
        })
      );
    },
    [dispatch]
  );

  const handleStep0 = React.useCallback(
    (formData: BasicData) => {
      setData({ ...data, ...formData });
      setStep(1);
    },
    [data]
  );

  const handleStep1 = React.useCallback(
    (formData: PhotoData) => {
      setData({ ...data, ...formData });
    },
    [data]
  );

  const handleStep2 = React.useCallback(
    (formData: TypeData) => {
      setData({ ...data, ...formData });
    },
    [data]
  );

  const handleStep3 = React.useCallback(
    (formData: ChurchData) => {
      setData({ ...data, ...formData });
    },
    [data]
  );

  const handleSubmit = React.useCallback(() => {
    handleCreateProfile(data as ProfileData);
  }, [data, handleCreateProfile]);

  const goToStep0 = React.useCallback(() => setStep(0), [setStep]);
  const goToStep1 = React.useCallback(() => setStep(1), [setStep]);
  const goToStep2 = React.useCallback(() => setStep(2), [setStep]);
  const goToStep3 = React.useCallback(() => setStep(3), [setStep]);

  return (
    <AuthScreen>
      <Steps step={step} />

      {step === 0 ? <BasicInputs onPress={handleStep0} {...data} /> : null}

      {step === 1 ? (
        <PhotoInputs
          onPress={handleStep1}
          onSubmit={goToStep2}
          onBackPress={goToStep0}
          {...data}
        />
      ) : null}

      {step === 2 ? (
        <TypeInputs
          onPress={handleStep2}
          onSubmit={goToStep3}
          onBackPress={goToStep1}
          {...data}
        />
      ) : null}

      {step === 3 ? (
        <ChurchInputs
          onPress={handleStep3}
          onBackPress={goToStep2}
          onSubmit={handleSubmit}
          isLoading={isLoading}
          {...data}
        />
      ) : null}
    </AuthScreen>
  );
};
