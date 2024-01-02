<script lang="ts">
  import { appState } from "$lib/state/appState";
  import { Cog } from "lucide-svelte";

  const loadingStates = [
    "mounting",
    "loading",
    "navigating",
    "flying",
    "navigatingWhileFlying",
    "disolving",
  ];
  $: loading = loadingStates.includes($appState);
</script>

{#if loading}
  <div
    class="absolute bottom-16 right-8 z-40 flex animate-spin items-center justify-center duration-1000 sm:right-16"
  >
    <Cog size={32}></Cog>
  </div>
{/if}
