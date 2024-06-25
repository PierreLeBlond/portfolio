<script lang="ts">
  import Hud from "./hud/Hud.svelte";

  export let title: string;
  export let githubLink: string | null = null;
  export let link: string | null = null;
</script>

<div class="grid h-full w-full horizontal:grid-cols-5">
  <div class="h-full horizontal:col-span-3">
    <slot name="project" />
  </div>
  <div
    class="fixed bottom-0 flex w-full justify-center justify-self-center horizontal:relative horizontal:col-span-2"
  >
    <Hud {title} {githubLink} {link}>
      <slot name="hud" />
    </Hud>
  </div>
</div>
