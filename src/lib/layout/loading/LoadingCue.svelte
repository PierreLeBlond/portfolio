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
    class="flex h-full w-full animate-spin items-center justify-center duration-1000"
  >
    <Cog size={32}></Cog>
  </div>
{/if}
