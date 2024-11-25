<script lang="ts">
  import type { PublicViewer } from "@s0rt/3d-viewer";
  import Objects from "./Objects/Objects.svelte";
  import { getAppContext } from "$lib/context/appContext";
  import { useCameraAnimation } from "$lib/hooks/useCameraAnimation.svelte";

  interface Props {
    viewer: PublicViewer;
  }

  let { viewer }: Props = $props();

  let app = getAppContext();

  useCameraAnimation({
    scene: viewer.viewer.scene,
    camera: viewer.viewer.camera,
    controls: viewer.viewer.controls,
    trigger: app.trigger,
  });
</script>

{#if app.state != "mounting"}
  <Objects />
{/if}
