import React from "react";
import { Greetings } from "~/components/greetings";
import { HeaderBar } from "~/components/header-bar";
import { HeaderBackground } from "./background";
import { HeaderContainer } from "./styles";

export function HomeHeader() {
  return (
    <HeaderContainer>
      <HeaderBackground />

      <HeaderBar />

      <Greetings />
    </HeaderContainer>
  );
}
