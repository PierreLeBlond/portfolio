import type { Page } from "$lib/stores/selectedPage";
import type { LayoutLoad } from "./$types";
import irradiance from "./assets/portfolio_rgbd_irradiance.dds?url";
import radiance from "./assets/portfolio_rgbd_radiance.dds?url";

export const load: LayoutLoad = () => {
  const pages: Page[] = [
    {
      objectName: "InkCube",
      pathname: "/projects/drawings/ink",
      label: "a cube",
      disolve: true,
    },
    {
      objectName: "LogoCube",
      pathname: "/projects/drawings/logo",
      label: "another cube",
      disolve: true,
    },
    {
      objectName: "Earth",
      pathname: "/projects/renderings/earth",
      label: "earth",
      disolve: true,
    },
    {
      objectName: "Wave",
      pathname: "/projects/apps/wave",
      label: "wave",
      disolve: false,
    },
    {
      objectName: "Ustom",
      pathname: "/projects/apps/ustom",
      label: "ustom",
      disolve: false,
    },
    {
      objectName: "Quests",
      pathname: "/projects/apps/quests",
      label: "quests",
      disolve: false,
    },
    {
      objectName: "Recipe",
      pathname: "/projects/apps/recipe",
      label: "recipes",
      disolve: false,
    },
    {
      objectName: "Chess",
      pathname: "/projects/renderings/chess",
      label: "chess",
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
