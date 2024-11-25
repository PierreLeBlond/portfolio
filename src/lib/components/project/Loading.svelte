<script lang="ts">
  import { getAppContext } from "$lib/context/appContext";
  import { Cog } from "lucide-svelte";

  const app = getAppContext();

  const loadingStates = [
    "mounting",
    "loading",
    "navigating",
    "flying",
    "navigatingWhileFlying",
    "disolving",
  ];
  let loading = $derived(loadingStates.includes(app.state));
</script>

{#if loading}
  <div
    class="fixed bottom-1/2 left-1/2 z-50 flex -translate-x-1/2 translate-y-1/2 text-stone-200"
  >
    <Cog size={64} class="animate-spin duration-1000"></Cog>
  </div>
{/if}
