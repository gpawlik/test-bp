import * as React from "react";
import { HomeHeader } from "./home-header";
import { Resources } from "~/components/resources";
import { SafeScrollView } from "~/components/safe-scroll-view";

export const Home = () => {
  return (
    <SafeScrollView>
      <HomeHeader />

      <Resources />
    </SafeScrollView>
  );
};
