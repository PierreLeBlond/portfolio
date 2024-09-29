import type { Page } from "$lib/stores/selectedPage";
import {
  CHESS_LABEL,
  EARTH_LABEL,
  INK_LABEL,
  LOGO_LABEL,
  QUESTS_LABEL,
  RECIPE_LABEL,
  TEAMUP_LABEL,
  USTOM_LABEL,
  WAVE_LABEL,
} from "../constants";
import type { LayoutLoad } from "./$types";
import irradiance from "./assets/portfolio_rgbd_irradiance.dds?url";
import radiance from "./assets/portfolio_rgbd_radiance.dds?url";

export const load: LayoutLoad = () => {
  const pages: Page[] = [
    {
      objectName: "InkCube",
      pathname: "/projects/drawings/ink",
      label: INK_LABEL,
      disolve: true,
    },
    {
      objectName: "LogoCube",
      pathname: "/projects/drawings/logo",
      label: LOGO_LABEL,
      disolve: true,
    },
    {
      objectName: "Earth",
      pathname: "/projects/renderings/earth",
      label: EARTH_LABEL,
      disolve: true,
    },
    {
      objectName: "Wave",
      pathname: "/projects/apps/wave",
      label: WAVE_LABEL,
      disolve: false,
    },
    {
      objectName: "Teamup",
      pathname: "/projects/apps/teamup",
      label: TEAMUP_LABEL,
      disolve: false,
    },
    {
      objectName: "Ustom",
      pathname: "/projects/apps/ustom",
      label: USTOM_LABEL,
      disolve: false,
    },
    {
      objectName: "Quests",
      pathname: "/projects/apps/quests",
      label: QUESTS_LABEL,
      disolve: false,
    },
    {
      objectName: "Recipe",
      pathname: "/projects/apps/recipe",
      label: RECIPE_LABEL,
      disolve: false,
    },
    {
      objectName: "Chess",
      pathname: "/projects/renderings/chess",
      label: CHESS_LABEL,
      disolve: true,
    },
  ];
  return {
    pages,
    irradiance,
    radiance,
    controlMinDistance: 0,
  };
};
