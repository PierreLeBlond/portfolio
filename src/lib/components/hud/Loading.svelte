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
    class="fixed bottom-1/2 left-1/2 z-50 flex -translate-x-1/2 translate-y-1/2 text-stone-200"
  >
    <Cog size={64} class="animate-spin duration-1000"></Cog>
  </div>
{/if}
