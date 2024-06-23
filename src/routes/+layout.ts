import type { Page } from "$lib/stores/selectedPage";
import type { LayoutLoad } from "./$types";
import irradiance from "./assets/portfolio_rgbd_irradiance.dds?url";
import radiance from "./assets/portfolio_rgbd_radiance.dds?url";

export const load: LayoutLoad = () => {
  const pages: Page[] = [
    {
      objectName: "InkCube",
      pathname: "/drawings/ink",
      label: "drawing",
      isExternal: false,
      disolve: true,
    },
    {
      objectName: "LogoCube",
      pathname: "/drawings/logo",
      label: "logo design",
      isExternal: false,
      disolve: true,
    },
    {
      objectName: "Earth",
      pathname: "/renderings/earth",
      label: "3d interactivity",
      isExternal: false,
      disolve: true,
    },
    {
      objectName: "Wave",
      pathname: "/apps/wave",
      label: "algorythm",
      isExternal: false,
      disolve: false,
    },
    {
      objectName: "Ustom",
      pathname: "/apps/ustom",
      label: "ustom",
      isExternal: false,
      disolve: false,
    },
    {
      objectName: "Quests",
      pathname: "/apps/quests",
      label: "quests",
      isExternal: false,
      disolve: false,
    },
    {
      objectName: "Recipe",
      pathname: "/apps/recipe",
      label: "recipes",
      isExternal: false,
      disolve: false,
    },
    {
      objectName: "Chess",
      pathname: "/renderings/chess",
      label: "render",
      isExternal: false,
      disolve: true,
    },
    {
      objectName: "Github",
      pathname: "https://github.com/PierreLeBlond",
      label: "github",
      isExternal: true,
      disolve: false,
    },
    {
      objectName: "At",
      pathname: "mailto:pierre.lespingal@gmail.com",
      label: "pierre.lespingal@gmail.com",
      isExternal: true,
      disolve: false,
    },
  ];
  return {
    pages,
    irradiance,
    radiance,
    controlMinDistance: 0,
  };
};
