<script lang="ts">
  import { scale } from "svelte/transition";
  import { backIn, backOut } from "svelte/easing";
</script>

<div
  class="flex h-full w-full items-center justify-center rounded border-2 border-stone-100 bg-gradient-to-tr from-stone-100/70 to-stone-300/70 px-4 text-stone-800 shadow-lg backdrop-blur"
  in:scale={{ easing: backOut, duration: 400 }}
  out:scale={{ easing: backIn, duration: 200 }}
>
  <p class="text-ellipsis text-sm text-stone-900">
    <slot />
  </p>
</div>
