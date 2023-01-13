import React from "react";
import { useAppSelector } from "~/state/hooks";
import { getUserFirstName } from "~/state/user/selectors";
import {
  GreetingsContainer,
  GreetingsDivider,
  GreetingsPhrase,
  GreetingsTitle,
} from "./styles";
import { getGreeting } from "./utils";

export function Greetings() {
  const greetingsName = useAppSelector(getUserFirstName);
  const greeting = getGreeting();

  return (
    <GreetingsContainer>
      <GreetingsTitle>{greeting.title}</GreetingsTitle>

      {greetingsName && <GreetingsTitle>{greetingsName}</GreetingsTitle>}

      <GreetingsDivider />

      <GreetingsPhrase>{greeting.phrase}</GreetingsPhrase>
    </GreetingsContainer>
  );
}
