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
      isExternal: false,
      disolve: true,
    },
    {
      objectName: "LogoCube",
      pathname: "/projects/drawings/logo",
      label: "another cube",
      isExternal: false,
      disolve: true,
    },
    {
      objectName: "Earth",
      pathname: "/projects/renderings/earth",
      label: "earth",
      isExternal: false,
      disolve: true,
    },
    {
      objectName: "Wave",
      pathname: "/projects/apps/wave",
      label: "wave",
      isExternal: false,
      disolve: false,
    },
    {
      objectName: "Ustom",
      pathname: "/projects/apps/ustom",
      label: "ustom",
      isExternal: false,
      disolve: false,
    },
    {
      objectName: "Quests",
      pathname: "/projects/apps/quests",
      label: "quests",
      isExternal: false,
      disolve: false,
    },
    {
      objectName: "Recipe",
      pathname: "/projects/apps/recipe",
      label: "recipes",
      isExternal: false,
      disolve: false,
    },
    {
      objectName: "Chess",
      pathname: "/projects/renderings/chess",
      label: "chess",
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
