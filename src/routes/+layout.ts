import type { LayoutLoad } from "./$types";
import irradiance from "./assets/portfolio-room_rgbd_irradiance.dds?url";
import radiance from "./assets/portfolio-room_rgbd_radiance.dds?url";

export const load: LayoutLoad = () => {
  return {
    pages: [
      {
        objectName: "InkCube",
        pathname: "/drawings/ink",
        label: "I like to draw",
        isExternal: false,
        disolve: true,
      },
      {
        objectName: "LogoCube",
        pathname: "/drawings/logo",
        label: "I found myself designing logos a few time",
        isExternal: false,
        disolve: true,
      },
      {
        objectName: "Earth",
        pathname: "/renderings/earth",
        label: "I made a basic interactive earth render",
        isExternal: false,
        disolve: true,
      },
      {
        objectName: "Wave",
        pathname: "/experiments/wave",
        label: "I played with the wave function collapse algorythm",
        isExternal: false,
        disolve: false,
      },
      {
        objectName: "Chess",
        pathname: "/renderings/chess",
        label: "I have a chessboard render",
        isExternal: false,
        disolve: true,
      },
      {
        objectName: "Github",
        pathname: "https://github.com/PierreLeBlond",
        label: "My github page!",
        isExternal: true,
        disolve: false,
      },
      {
        objectName: "At",
        pathname: "mailto:pierre.lespingal@gmail.com",
        label: "You can contact me at pierre.lespingal@gmail.com",
        isExternal: true,
        disolve: false,
      },
    ],
    irradiance,
    radiance,
    controlMinDistance: 0,
  };
};
