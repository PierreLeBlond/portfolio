<script lang="ts">
  import { backIn, bounceOut } from "svelte/easing";
  import { scale } from "svelte/transition";
  import { Cog } from "lucide-svelte";
  import { appState } from "$lib/state/appState";
</script>

{#if $appState === "mounting"}
  <div
    class="flex h-full w-full animate-spin items-center justify-center duration-1000"
    in:scale={{ easing: bounceOut, duration: 200 }}
    out:scale={{ easing: backIn, duration: 50 }}
  >
    <Cog size={32}></Cog>
  </div>
{/if}
