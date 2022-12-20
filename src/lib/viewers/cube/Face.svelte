<script lang="ts">
  export let url: string;
  export let yaw = 0;
  export let pitch = 0;
  export let translation = 0;
  export let faceSize: number;
  export let addImage: (node: HTMLElement, url: string) => { update: (newUrl: string) => void; destroy: () => void };
</script>

<div
  use:addImage={url}
  class="absolute flex w-full h-full justify-center items-center bg-contain bg-no-repeat bg-center bg-gray-200 border border-gray-800"
  style="box-shadow: rgba(0, 0, 0, 0.1) 0px 0px {faceSize / 20}px {faceSize / 30}px inset;
          transform-style: preserve-3d;
          transform: rotateX({pitch}deg) rotateY({yaw}deg) translate3d(0, 0, {translation}px);"
/>
