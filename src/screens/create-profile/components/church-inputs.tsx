import * as React from "react";
import { useNavigation } from "@react-navigation/native";

import * as routes from "~/constants/routes";
import { PreAuthNavigationProps } from "~/navigation/pre-auth";
import { InputBox } from "~/components/auth-screen/styles";
import { TextInput } from "~/components/text-input";
import { ModalInput, Options } from "~/components/modal-input";
import { Button } from "~/components/button";
import { ButtonTypes } from "~/components/button/types";
import { AccountType } from "~/state/user/types";
import { formatMessage } from "~/utils/translation";

import { messages } from "../intl";
import { ChurchData } from "../types";
import { Container, Content, ButtonWrapper, ButtonBox } from "../styles";

type Props = {
  onPress: (data: ChurchData) => void;
  onSubmit: () => void;
  onBackPress: () => void;
  isLoading: boolean;
  accountType?: AccountType;
  attendance?: string;
  churchName?: string;
  churchLocation?: string;
  churchSize?: string;
  churchRole?: string;
};

export const ChurchInputs = React.memo<Props>(
  ({
    onPress,
    attendance = "",
    churchName = "",
    churchLocation = "",
    churchSize = "",
    churchRole = "",
    accountType,
    onSubmit,
    onBackPress,
    isLoading,
  }) => {
    const data = {
      attendance,
      churchName,
      churchLocation,
      churchSize,
      churchRole,
    };

    const navigation = useNavigation<PreAuthNavigationProps>();

    const isIndividual = accountType === AccountType.Individual;
    const isAttendingChurch = attendance === "yes";
    const isNotAttendingChurch = ["no", "prefer-not-say"].includes(attendance);
    const showChurchDetails = !isIndividual || isAttendingChurch;
    const isValid =
      (isIndividual &&
        (isNotAttendingChurch || (churchName && churchLocation))) ||
      (!isIndividual &&
        churchName &&
        churchLocation &&
        churchSize &&
        churchRole);

    const handleSubmit = React.useCallback(() => {
      if (isValid) {
        onSubmit();
      }
    }, [isValid]);

    const handleLocationPress = React.useCallback(() => {
      navigation.navigate(routes.locationModal, {
        onPress: (value: string) => onPress({ ...data, churchLocation: value }),
        value: churchLocation,
      });
    }, [churchLocation, data]);

    const attendanceOptions = [
      { id: "yes", label: messages.churchAttendance1 },
      { id: "no", label: messages.churchAttendance2 },
      { id: "prefer-not-say", label: messages.churchAttendance3 },
      { id: "cancel", label: messages.cancel },
    ];

    const sizeOptions = [
      { id: "0-200", label: messages.churchSize1 },
      { id: "200-500", label: messages.churchSize2 },
      { id: "500-2000", label: messages.churchSize3 },
      { id: "2000+", label: messages.churchSize4 },
      { id: "cancel", label: messages.cancel },
    ];

    const roleOptions = [
      { id: "lead-pastor", label: messages.churchRole1 },
      { id: "ministry-leader", label: messages.churchRole2 },
      { id: "administrative", label: messages.churchRole3 },
      { id: "volunteer-leader", label: messages.churchRole4 },
      { id: "other", label: messages.churchRole5 },
      { id: "cancel", label: messages.cancel },
    ];

    const getLabel = (id: string, options: Options[]) => {
      const label = options.find((item) => item.id === id)?.label;
      return label ? formatMessage(label) : "";
    };

    const handleSetAttendance = React.useCallback(
      (value: string) => {
        onPress({ ...data, attendance: value });
      },
      [onPress, data]
    );

    const handleSetChurchName = React.useCallback(
      (value: string) => {
        onPress({ ...data, churchName: value });
      },
      [onPress, data]
    );

    const handleSetChurchLocation = React.useCallback(
      (value: string) => {
        onPress({ ...data, churchLocation: value });
      },
      [onPress, data]
    );

    const handleSetChurchRole = React.useCallback(
      (value: string) => {
        onPress({ ...data, churchRole: value });
      },
      [onPress, data]
    );

    const handleSetChurchSize = React.useCallback(
      (value: string) => {
        onPress({ ...data, churchSize: value });
      },
      [onPress, data]
    );

    return (
      <>
        <Container>
          <Content>
            <InputBox>
              {isIndividual ? (
                <ModalInput
                  options={attendanceOptions}
                  label={messages.churchAttendance}
                  value={getLabel(attendance, attendanceOptions)}
                  onChangeText={handleSetAttendance}
                  key="attendance"
                />
              ) : null}

              {showChurchDetails ? (
                <>
                  <TextInput
                    label={messages.churchName}
                    value={churchName}
                    onChangeText={handleSetChurchName}
                    key="churchName"
                  />
                  <TextInput
                    label={messages.churchLocation}
                    value={churchLocation}
                    onChangeText={handleSetChurchLocation}
                    onOverlayPress={handleLocationPress}
                    key="churchLocation"
                  />
                </>
              ) : null}

              {!isIndividual ? (
                <>
                  <ModalInput
                    options={roleOptions}
                    label={messages.churchRole}
                    value={getLabel(churchRole, roleOptions)}
                    onChangeText={handleSetChurchRole}
                    key="churchRole"
                  />
                  <ModalInput
                    options={sizeOptions}
                    label={messages.churchSize}
                    value={getLabel(churchSize, sizeOptions)}
                    onChangeText={handleSetChurchSize}
                    key="churchSize"
                  />
                </>
              ) : null}
            </InputBox>
          </Content>
        </Container>

        <ButtonWrapper>
          <ButtonBox>
            <Button
              text={messages.buttonPrevious}
              onPress={onBackPress}
              type={ButtonTypes.Outlined}
            />
          </ButtonBox>
          <ButtonBox isLast>
            <Button
              text={messages.buttonDone}
              onPress={handleSubmit}
              type={ButtonTypes.Primary}
              isDisabled={!isValid}
              isLoading={isLoading}
            />
          </ButtonBox>
        </ButtonWrapper>
      </>
    );
  }
);
