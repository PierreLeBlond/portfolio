<script lang="ts">
  import { imagePromises } from './imagePromises';

  export let url: string;
  export let yaw = 0;
  export let pitch = 0;
  export let translation = 0;
  export let faceSize: number;

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
    node.innerHTML = '';

    if (newUrl == '') {
      return;
    }

    let imagePromise = $imagePromises[newUrl];

    if (!imagePromise) {
      imagePromise = getImage(newUrl);
      $imagePromises[newUrl] = imagePromise;
    }

    imagePromise.then((image: HTMLImageElement) => {
      // If another promise has been called meanwhile, nothing more to do
      if (imagePromise != $imagePromises[url]) {
        return;
      }
      node.innerHTML = '';
      node.appendChild(image.cloneNode());
    });
  };

  function addImage(node: HTMLElement, url: string) {
    addImageCore(node, url);
    return {
      update: (newUrl: string) => {
        addImageCore(node, newUrl);
      },
      destroy: () => {}
    };
  }
</script>

<div
  use:addImage={url}
  class="absolute flex w-full h-full justify-center items-center bg-contain bg-no-repeat bg-center bg-gray-200 border border-gray-800"
  style="box-shadow: rgba(0, 0, 0, 0.1) 0px 0px {faceSize / 20}px {faceSize / 30}px inset;
          transform-style: preserve-3d;
          transform: rotateX({pitch}deg) rotateY({yaw}deg) translate3d(0, 0, {translation}px);"
/>
