<script lang="ts">
  import { scale } from "svelte/transition";
  import { backIn, backOut } from "svelte/easing";

  export let href: string;
</script>

<a
  class="flex rounded-full bg-stone-200 p-2 text-stone-700 shadow-lg large:p-3"
  in:scale={{ easing: backOut, duration: 400 }}
  out:scale={{ easing: backIn, duration: 200 }}
  {href}
>
  <slot />
</a>
