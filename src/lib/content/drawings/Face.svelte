<script lang="ts">
  import { imagePromises } from "./imagePromises";

  interface Props {
    url: string | null;
    yaw?: number;
    pitch?: number;
    translation?: number;
    faceSize: number;
  }

  let { url, yaw = 0, pitch = 0, translation = 0, faceSize }: Props = $props();

  const getImage = (url: string): Promise<HTMLImageElement> => {
    return new Promise((resolve) => {
      const image = new Image();
      image.src = url;
      image.alt = url;
      image.onload = () => {
        resolve(image);
      };
    });
  };

  const addImageCore = (node: HTMLElement, newUrl: string) => {
    node.innerHTML = "";

    if (newUrl == "") {
      return;
    }

    let imagePromise = $imagePromises[newUrl];

    if (!imagePromise) {
      imagePromise = getImage(newUrl);
      $imagePromises[newUrl] = imagePromise;
    }

    imagePromise.then((image: HTMLImageElement) => {
      // If another promise has been called meanwhile, nothing more to do
      if (imagePromise != $imagePromises[newUrl]) {
        return;
      }
      node.innerHTML = "";
      node.appendChild(image.cloneNode());
    });
  };

  function addImage(node: HTMLElement, url: string | null) {
    if (url == null) {
      return;
    }
    addImageCore(node, url);
    return {
      update: (newUrl: string) => {
        addImageCore(node, newUrl);
      },
      destroy: () => {},
    };
  }
</script>

<div
  use:addImage={url}
  class="absolute flex h-full w-full items-center justify-center border border-gray-800 bg-gray-200 bg-contain bg-center bg-no-repeat"
  style="box-shadow: rgba(0, 0, 0, 0.1) 0px 0px {faceSize / 20}px {faceSize /
    30}px inset;
          transform-style: preserve-3d;
          transform: rotateX({pitch}deg) rotateY({yaw}deg) translate3d(0, 0, {translation}px);"
></div>
